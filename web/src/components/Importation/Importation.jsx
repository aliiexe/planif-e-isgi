import { useState } from 'react';
import {axiosClient} from '../../api/axiosClient';

const labelsTitle = [
  'Filières',
  'Option filières',
  'Complexe',
  'Etablissement',
  'Formateur',
  'Module',
  'Salle',
  'Groupe distanciel',
  'Groupe physique',
  'Groupe présentiel',
  'Affectations'
];

const Importation = () => {
  const [files, setFiles] = useState(Array(11).fill(null));

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routes = [
      'import', // Correspond à la route définie pour l'importation des filières
      'importop',
      'importcomp',
      'importetab',
      'importform',
      'importmod',
      'importSalle',
      'importGroupedistanciel',
      'importGroupephysique',
      'importGroupepresentiel',
      'importAffectation',
    ];

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);

          const response = await axiosClient.post(`/${routes[index]}`, formData);

          if (response.status === 200) {
            console.log(`${labelsTitle[index]} uploaded successfully to ${routes[index]}`);
          } else {
            console.error(`Failed to upload file ${index + 1} to ${routes[index]}`);
            return; // Exit the function if upload fails
          }
        }
      }

      console.log('All files processed');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Télécharger Fichiers Excel</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labelsTitle.map((label, index) => (
              <div key={index}>
                <label htmlFor={`fileInput${index}`} className="text-gray-600 block mb-1">{label}</label>
                <input
                  type="file"
                  id={`fileInput${index}`}
                  name={`fileInput${index}`}
                  className="file-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => handleFileChange(e, index)}
                />
              </div>
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Télécharger tous
          </button>
        </form>
      </div>
    </div>
  );
};

export default Importation;
