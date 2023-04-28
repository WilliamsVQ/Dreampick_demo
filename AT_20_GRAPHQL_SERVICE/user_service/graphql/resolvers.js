import User from '../models/User.js'
import Role from '../models/Role.js'
import Note from '../models/Note.js'
import fs, { createWriteStream } from 'fs'
import  GraphQLUpload  from 'graphql-upload/GraphQLUpload.mjs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import FormData from 'form-data';
import bcrypt from 'bcrypt';
import twilio from "twilio";
import dotenv from 'dotenv';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
dotenv.config();
const __dirname = path.resolve();
const saveImagesWithStream = ({ filename, mimetype, stream }) => {

    const uniqueId = uuidv4();
    const path = `uploads/${uniqueId}-${filename}`;
    const name = `${uniqueId}-${filename}`;
    return new Promise((resolve, reject) =>
      stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ path, name, mimetype }))
      .on("error", reject)
    );
  };

export const resolvers = {

    Upload: GraphQLUpload,
    Query: {
        users: async() => await User.find(),
        user: async(_, {_id}) => await User.findById(_id),
        roles: async() => await Role.find(),
        role: async(_, {_id}) => await Role.findById(_id),
        notes: async() => await Note.find(),
        note: async(_, {_id}) => await Note.findById(_id),
        photo: (parent, { filename }, context) => {
            const filePath = path.join('.', '/uploads', filename);
            console.log(filePath);
            return filePath;
        },
        getQuestionnaire: async (_, { test }) => {
          try {
            const response = await fetch(`http://${process.env.CONTAINER_NAME_QUESTIONNAIRE}:${process.env.QUESTIONNAIRE_SERVICE_PORT}/api/v1.0/questionnaire/${test}`);
            const question = await response.json();
            console.log(question)
            return question;
          } catch (error) {
            throw new Error(error.type);
          }
        },
        getQuestionByID: async (_, { id }) => {
            try {
              const response = await fetch(`http://${process.env.CONTAINER_NAME_QUESTIONNAIRE}:${process.env.QUESTIONNAIRE_SERVICE_PORT}/api/v1.0/question/${id}`);
              const question = await response.json();
              console.log(question)
              return question;
            } catch (error) {
              throw new Error(error.type);
            }
          },
        getMeetings: async () => {
            const config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: `${process.env.MEETINGS_SERVICE_URL}:${process.env.MEETINGS_SERVICE_PORT}${process.env.MEETINGS_SERVICE_INTERVIEWS_PATH}`,
              headers: { }
            };
      
            try {
              const response = await axios.request(config);
              return response.data;
            } catch (error) {
              console.error(error);
              return [];
            }
          }
    },

    Mutation: {

      convertImage: async (_, { image, width, height }) => {
        try {
          const { filename, mimetype, createReadStream } = await image;
          const stream = createReadStream();
          const upload = await saveImagesWithStream({ filename, mimetype, stream });
          const data = new FormData();
          //const filePath = path.join(uploadDir, image.filename);
          //await image.createReadStream().pipe(fs.createWriteStream(filePath));
          data.append('image', fs.createReadStream(`./uploads/${upload.name}`));
          data.append('width', String(width));
          data.append('height', String(height));
          const response = await axios.post(`${process.env.CONVERTER_SERVICE_URL}:${process.env.CONVERTER_SERVICE_PORT}${process.env.CONVERTER_SERVICE_IMAGE_PATH}`, data, {
            headers: { 
              ...data.getHeaders()
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
          });
          console.log(response.data);
          return { url: response.data.downloadUrl };
        } catch (error) {
          console.error(error);
          throw new Error('Failed to convert image.');
        }
      },

        compiler: async (parent, { file, language }) => {
            const { filename, mimetype, createReadStream } = await file;
            let data = '';
            const stream = createReadStream();
            const upload = await saveImagesWithStream({ filename, mimetype, stream });
            const form = new FormData();
            form.append('file', fs.createReadStream(`./uploads/${upload.name}`));
            form.append('language', language);
            const resp = await axios.post(`${process.env.COMPILER_SERVICE_URL}:${process.env.COMPILER_SERVICE_PORT}${process.env.COMPILER_SERVICE_PATH}`, form) 
            .then(function (response) { console.log(response.data.stdout); data = response.data.stdout }) 
            .catch(function (error) 
            { console.log(error); 
              data = error.response.data.stdout 
              ? error.response.data.stdout 
              : error.response.data.error; }); 
            return data
        },
        createQuestion: async (_, { question, test, imgSrc, type, answer, options }) => {
            try {
              const response = await axios.post(`http://${process.env.CONTAINER_NAME_QUESTIONNAIRE}:${process.env.QUESTIONNAIRE_SERVICE_PORT}/api/v1.0/question/`, {
                question,
                test,
                imgSrc,
                type,
                answer,
                options,
              });
              console.log(response.data)
              return response.data;
            } catch (error) {
              console.error(error.response.data);
              throw new Error('Failed to create question');
            }
          },

        newMeeting: async (parent, args, context, info) => {
            const config = {
              method: 'post',
              maxBodyLength: Infinity,
              url:`${process.env.MEETINGS_SERVICE_URL}:${process.env.MEETINGS_SERVICE_PORT}${process.env.MEETINGS_SERVICE_SAVE_PATH}`,
              headers: {
                'Content-Type': 'application/json'
              },
              data: args.data
            };
            try {
              const response = await axios.request(config);
              response.data.guest_global_id.map((item) => {
               // const client = twilio(accountSid, authToken);
                    /*client.messages
                        .create({
                            from: 'whatsapp:+14155238886',
                            body: 'Dear '+item.name+', you have a meeting scheduled for the date '+ response.data.date + ' at '+ response.data.start_time + ' to '+  response.data.end_time,
                            to: "whatsapp:"+item.phone
                        })
                        .then(message => console.log(message.sid, message.to));*/

             });
              return JSON.stringify(response.data);
            } catch (error) {
              console.log(error);
              return error;
            }
          },


        uploadNote: async (_, {userId, nameTest, answers, score}) => {
            const note = new Note({
                userId,
                nameTest,
                answers,
                score,
            })
            const noteSaved = await note.save();
            return noteSaved
        },



        createRole: async (_, {name}) => {
            const role = new Role({
                name
            })
            const roleSaved = await role.save();
            return roleSaved
        },

        createUser: async (_, {globalID, firstName, lastName, userName, password, email, phone, country, city, age, roleId, photo}) => {
            //const userNameSearch = await User.findOne({'userName': userName});
            const userEmailSearch = await User.findOne({'email':email});
            //if (!userNameSearch && !userEmailSearch) {
            if (!userEmailSearch) {
            const newPassword= process.env.DEF_PASSWORD;
            //const hashedPassword = await bcrypt.hash(newPassword, 10);
            const firstPassword = newPassword;
            password = '';
            globalID = uuidv4();
            userName = uuidv4();
            age = '';
            const user = new User({
                globalID,
                firstName, 
                lastName,
                userName,
                firstPassword,
                password,
                email, 
                phone, 
                country,
                city, 
                age,
                photo,
                roleId,
            })
            /*const client = twilio(accountSid, authToken);
                client.messages
                    .create({
                        from: 'whatsapp:+14155238886',
                        body: 'Dear applicant, you are a candidate for the Pepito bootcamp, your username is the email address you used to register and your password is '+"*"+firstPassword+"*",
                        to: "whatsapp:"+phone
                    })
                    .then(message => console.log(message.sid, message.to));*/
            const savedUser = await user.save();
            return savedUser;
            }
        },

        login: async(_, { userName, email, password }) =>{
            //const userNameSearch = await User.findOne({'userName':userName});
            const userEmailSearch = await User.findOne({'email':email});
            const userLogin = userEmailSearch;
            console.log(userLogin);
            if (!userLogin || !userLogin.firstPassword) {
                return { message: 'User not found' };
              } else {
                  if (password === userLogin.firstPassword) {
                  //const validatePass= await bcrypt.compare(password, userLogin.firstPassword);
                  //if (validatePass) {
                    return { message: 'Login Succesful!', info: userLogin };
                  } else {
                    return { message: 'Wrong password' };
                  }
              }
        },

        deleteUser: async (_, {_id}) => {
            const deleteUser = await User.findByIdAndDelete(_id);
            if (!deleteUser) throw new Error('User not found');
            await Role.deleteMany({userId: deleteUser._id})
            await Note.deleteMany({userId: deleteUser._id})
            return deleteUser;
        },

        deleteRole: async (_, {_id}) => {
            const deleteRole = await Role.findByIdAndDelete(_id);
            if (!deleteRole) throw new Error('Role not found');
            return deleteRole;
        },

        updateUser: async (_, args) => {
            const updateUser = await User.findByIdAndUpdate(args._id, args, {new: true});
            if(!updateUser) throw new Error('User not found');
            return updateUser;
        },
        singleUpload: async (_, args) => {
            console.log(args);
            const { filename, mimetype, createReadStream } = await args.file;
            const stream = createReadStream();
            const file = await saveImagesWithStream({ filename, mimetype, stream });
            console.log(file.name);
            return file.name;
        },
    },
        User: {
            role: async(user) => await Role.findById(user.roleId),
            notes: async(user) => await Note.find({userId: user._id}),
    },
        Role: {
            users: async(role) => await User.find({roleId: role._id}),
    },
        Note: {
            user: async(note) => await User.findById(note.userId),
    }
}

