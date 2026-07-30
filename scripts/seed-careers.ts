import mongoose from 'mongoose';
import { connectDB } from '../lib/db';
import { Career } from '../lib/models/Career';

async function seedCareers() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database.');

    console.log('Clearing existing career postings...');
    await Career.deleteMany({});

    const jobs = [
      {
        title: 'Senior Site Engineer (Civil)',
        department: 'Civil Engineering',
        location: 'Erode & Chennai Sites',
        type: 'Full-Time',
        experience: '3-6 Years',
        salary: '₹40,000 - ₹55,000 / month',
        description: 'Lead day-to-day site execution for major hospital and commercial building projects across Tamil Nadu. Responsible for quality assurance, contractor supervision, and adherence to architectural blueprints.',
        requirements: '• B.E / B.Tech in Civil Engineering\n• Proven track record in multi-story commercial construction\n• Proficiency in AutoCAD, Total Station leveling, and MS Project\n• Strong leadership and communication skills in Tamil and English',
        isActive: true,
        order: 1
      },
      {
        title: 'Project Manager (Infrastructure)',
        department: 'Project Management',
        location: 'Erode HQ',
        type: 'Full-Time',
        experience: '8+ Years',
        salary: 'As per industry standards',
        description: 'Oversee end-to-end lifecycle of government and private infrastructure projects including bridges, roads, and institutional complexes. Manage budgeting, client relations, and safety compliance.',
        requirements: '• M.E / M.Tech / B.E in Civil Engineering or Construction Management\n• Minimum 5 years in a managerial role executing PWD or CMDA tenders\n• Deep understanding of billing, estimation, and labor management',
        isActive: true,
        order: 2
      },
      {
        title: 'Junior Architect & CAD Designer',
        department: 'Architecture & Design',
        location: 'Erode HQ',
        type: 'Full-Time',
        experience: '1-3 Years / Fresher',
        salary: '₹25,000 - ₹35,000 / month',
        description: 'Collaborate with senior structural engineers to draft detailed 2D blueprints and 3D elevation models for upcoming residential and commercial projects.',
        requirements: '• B.Arch or Diploma in Civil / CAD\n• Mastery of AutoCAD 2D/3D, SketchUp, Lumion, and Revit\n• Keen eye for modern aesthetic details and space optimization',
        isActive: true,
        order: 3
      },
      {
        title: 'HR & Administration Officer',
        department: 'Administration & HR',
        location: 'Erode HQ',
        type: 'Full-Time',
        experience: '2-4 Years',
        salary: '₹20,000 - ₹30,000 / month',
        description: 'Manage site labor compliance, payroll attendance, and office administrative operations at our Erode headquarters.',
        requirements: '• MBA in HR or Any Bachelor Degree with HR experience\n• Knowledge of PF, ESI, and labor laws\n• Fluency in Tamil and English communication',
        isActive: true,
        order: 4
      }
    ];

    console.log('Inserting sample career opportunities...');
    await Career.create(jobs);
    console.log(`Successfully seeded ${jobs.length} career postings!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding careers:', error);
    process.exit(1);
  }
}

seedCareers();
