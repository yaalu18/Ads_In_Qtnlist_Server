import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import questionRoutes from './routes/api/questions.js';
import adRoutes from './routes/ads.js';
import Question from './models/Question.js';
import Ad from './models/Ad.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
console.log('MongoDB URI:', process.env.MONGODB_URI); 
console.log('PORT:', process.env.PORT); 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{
    console.log('MongoDB connected');
    sendData(); // Call seedData once the connection is established
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/questions', questionRoutes);
app.use('/api/ads', adRoutes);
// Seed function to insert data
const sendData = async () => {
  try {
    // Sample questions
    const questions = [
      { title: 'Sample Question 1', content: 'How does React reconciliation algorithm work and what is its significance?' },
      { title: 'Sample Question 2', content: 'What are React Hooks and how do they differ from class components?' },
      { title: 'Sample Question 2', content: 'What is the purpose of the useEffect hook in React, and how can you use it to handle side effects in functional components?' },
    ];

    // Sample ads
    const ads = [
      {
        content: `Power BI. Unlock the Power of Your Data with Power BI! Transform your business insights with Power BI! Our comprehensive tools and features help you:
        - **Visualize Your Data:** Create stunning, interactive dashboards and reports that make your data come alive.
        - **Gain Deep Insights:** Discover patterns, trends, and actionable insights with advanced analytics and machine learning capabilities.
        - **Seamless Integration:** Connect to a wide range of data sources effortlessly, from spreadsheets to cloud services.
        - **Drive Informed Decisions:** Empower your team with real-time data and make strategic decisions that propel your business forward.
        Get started today and see how Power BI can revolutionize your data strategy!
        Visit [YourCompanyWebsite.com] to learn more and request a demo!`
      },
      {
        content: `Flask & Angular. Master Flask and Angular to Build Modern Web Applications! Ready to dive into web development with Flask and Angular? Enhance your skills with our expert-led training that covers:
        - **Flask Fundamentals:** Learn to build robust back-end applications using Flask, with practical lessons on routing, templates, and databases.
        - **Angular Essentials:** Develop dynamic and responsive front-end applications with Angular, including components, services, and state management.
        - **Hands-On Projects:** Work on real-world projects to integrate Flask and Angular, gaining valuable experience and skills for your portfolio.
        - **Comprehensive Resources:** Access detailed tutorials, exercises, and reference materials designed for both beginners and advanced developers.
        Elevate your web development expertise and open doors to exciting opportunities in the tech industry.
        Enroll now and start building the next generation of web apps!
        Visit [YourTrainingWebsite.com] to sign up for our Flask and Angular course today!`
      }
    ];
     
    // Check if the collections are empty
    const questionCount = await Question.countDocuments();
    const adCount = await Ad.countDocuments();

    if (questionCount === 0) {
      await Question.insertMany(questions);
      console.log('Questions data seeded');
    }

    if (adCount === 0) {
      await Ad.insertMany(ads);
      console.log('Ads data seeded');
    }
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
