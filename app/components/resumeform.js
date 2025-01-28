import React, { useState } from 'react';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    education: [
      {
        collegeName: '',
        fromYear: '',
        toYear: '',
        percentage: ''
      }
    ],
    experience: [
      {
        designation: '',
        fromYear: '',
        toYear: '',
        company: ''
      }
    ],
    skills: [''],
    certifications: ['']
  });

  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    education: true,
    experience: true,
    skills: true,
    certifications: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // ... (keeping the same state management functions)
  const handleInputChange = (e, section, index, field) => {
    const { value } = e.target;
    if (section === 'personalInfo') {
      setFormData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }));
    }
  };

  const handleArrayInputChange = (e, section, index) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? value : item)
    }));
  };

  const addItem = (section) => {
    const newItem = section === 'education' 
      ? { collegeName: '', fromYear: '', toYear: '', percentage: '' }
      : section === 'experience'
      ? { designation: '', fromYear: '', toYear: '', company: '' }
      : '';

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const SectionHeader = ({ title, isExpanded, onToggle, onAdd, showAdd }) => (
    <div className="flex items-center justify-between py-4 px-2 border-b border-gray-100 ">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onToggle}>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        <h2 className="text-lg font-medium text-gray-700">{title}</h2>
      </div>
      {showAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="text-indigo-600 hover:text-indigo-700 p-1 rounded-full hover:bg-indigo-50 transition-colors"
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Personal Information */}
      <div className="border-b">
        <SectionHeader 
          title="Personal Information" 
          isExpanded={expandedSections.personalInfo}
          onToggle={() => toggleSection('personalInfo')}
        />
        {expandedSections.personalInfo && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData.personalInfo).map(([field, value]) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  value={value}
                  onChange={(e) => handleInputChange(e, 'personalInfo', null, field)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education */}
      <div className="border-b">
        <SectionHeader 
          title="Education" 
          isExpanded={expandedSections.education}
          onToggle={() => toggleSection('education')}
          onAdd={() => addItem('education')}
          showAdd={true}
        />
        {expandedSections.education && (
          <div className="p-4 space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="relative p-4 bg-gray-50 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(edu).map(([field, value]) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </label>
                      <input
                        type={field === 'percentage' ? 'number' : 'text'}
                        value={value}
                        onChange={(e) => handleInputChange(e, 'education', index, field)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        required
                      />
                    </div>
                  ))}
                </div>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('education', index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="border-b">
        <SectionHeader 
          title="Experience" 
          isExpanded={expandedSections.experience}
          onToggle={() => toggleSection('experience')}
          onAdd={() => addItem('experience')}
          showAdd={true}
        />
        {expandedSections.experience && (
          <div className="p-4 space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="relative p-4 bg-gray-50 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(exp).map(([field, value]) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-600 mb-1 capitalize">
                        {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(e, 'experience', index, field)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        required
                      />
                    </div>
                  ))}
                </div>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('experience', index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="border-b">
        <SectionHeader 
          title="Skills" 
          isExpanded={expandedSections.skills}
          onToggle={() => toggleSection('skills')}
          onAdd={() => addItem('skills')}
          showAdd={true}
        />
        {expandedSections.skills && (
          <div className="p-4 space-y-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleArrayInputChange(e, 'skills', index)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('skills', index)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="border-b">
        <SectionHeader 
          title="Certifications" 
          isExpanded={expandedSections.certifications}
          onToggle={() => toggleSection('certifications')}
          onAdd={() => addItem('certifications')}
          showAdd={true}
        />
        {expandedSections.certifications && (
          <div className="p-4 space-y-2">
            {formData.certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={cert}
                  onChange={(e) => handleArrayInputChange(e, 'certifications', index)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  required
                />
                {formData.certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem('certifications', index)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="p-4">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          Generate Resume
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;