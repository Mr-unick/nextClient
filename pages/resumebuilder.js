import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';  // We can still keep jsPDF for custom formatting if needed
import html2canvas from 'html2canvas';  // Import html2canvas
import ResumeTemplate from '../app/components/resumeTemplate1.js';
import { sampleData } from '../../const';
import { AuroraText } from '../components/components/ui/aurora-text';
import { Meteors } from '../components/components/ui/meteors';
import ResumeForm from '../app/components/resumeform';
import { RainbowButton } from '../components/components/ui/rainbow-button';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: [{ title: '', company: '', years: '' }],
    education: [{ degree: '', institution: '', years: '' }],
    skills: '',
    summary: '',
  });

  const [generatedResume, setGeneratedResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayInputChange = (e, section, index) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleAddMore = (section) => {
    setFormData({
      ...formData,
      [section]: [
        ...formData[section],
        section === 'experience'
          ? { title: '', company: '', years: '' }
          : { degree: '', institution: '', years: '' },
      ],
    });
  };

  const handleSubmit = (data)=>{
    console.log(data)
  }

  const handleGenerate = async (e) => {
    // e.preventDefault();
    setLoading(true);
    setError(null);

    // const prompt = `Generate a resume based on the following information:\n\n${JSON.stringify(formData, null, 2)} and generate json as exact as ${sampleData} any value shouldent be empty or null also make sure the provided sample json structure should be followed striclty`;

const prompt = `
Please generate a resume using the following structure. The output should follow the exact same format as the sample JSON provided below. Ensure that all values are filled and no fields are left empty or null. 

Here is the sample data structure that must be followed strictly:

${JSON.stringify(sampleData, null, 2)}

And here is the data I have provided:

${JSON.stringify(formData, null, 2)}

Please generate a resume in the exact format as the sample JSON, replacing values from the provided data. Ensure there are no empty or null fields in the output.

i only want json data , do not provide any note or other text except json data
`;


    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${'AIzaSyDxEib-er30XwjLmzeGn6kmVZpElqCauto'}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

     
      let long=(response.data.candidates[0].content.parts[0].text).length
    
      let generatedText = (response.data.candidates[0].content.parts[0].text).slice(7,long-4);
    // console.log(generatedText)
      setGeneratedResume(JSON.parse(generatedText));

    } catch (err) {
      setError(err.message || 'Error generating resume.');
      console.error('API Error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    // Ensure generatedResume is not null and has content
    if (!generatedResume) return;

    // Select the element where the resume is displayed
    const resumeContent = document.getElementById('resume-content');

    // Use html2canvas to capture the content as an image
    html2canvas(resumeContent).then((canvas) => {
      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Convert the canvas to an image (base64-encoded)
      const imgData = canvas.toDataURL('image/png');

      // Add the image to the PDF (10, 10) is the position on the page
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);  // 180, 160 is the width and height of the image in mm

      // Save the PDF with the name 'generated_resume.pdf'
      pdf.save('generated_resume.pdf');
    });
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center flex-col h-screen">
      {/* <h1 className="text-6xl font-extrabold mb-4">Resume <AuroraText>Builder</AuroraText> </h1> */}
      <Meteors number={30} />
     <div className='flex justify-center items-center py-14'>
     <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl uppercase">
      Resume <AuroraText>Builder</AuroraText>
    </h1>
     </div>

      {/* <ResumeTemplate data={sampleData}/> */}

      {/* <form className="space-y-4"> */}
        {/* Basic Input Fields */}
        {/* <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div> */}

        {/* <ResumeForm onSubmit={handleSubmit} /> */}

        {/* Other form fields go here... */}

       <div className='flex gap-4'>
       <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Create Resume
        </button>

      <RainbowButton onClick={()=>handleGenerate()}>
      {loading ? 'Generating...' : 'Generate With AI'}
      </RainbowButton>
       </div>
{/* 
        {error && <div className="text-red-500">{error}</div>}
      </form> */}

      {/* Generated Resume */}
      {generatedResume && (
        // <div className="mt-8 border p-6 rounded bg-white shadow-lg" id="resume-content">
        //   <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Generated Resume</h2>
        //   {/* <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
        //     <pre>{generatedResume}</pre>
        //   </div>
        //   <button
        //     onClick={handleDownloadPDF}
        //     className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        //   >
        //     Download as PDF
        //   </button> */}
           
        // </div>
        <ResumeTemplate data={  generatedResume}/>
      )}
    </div>
  );
};

export default ResumeBuilder;
