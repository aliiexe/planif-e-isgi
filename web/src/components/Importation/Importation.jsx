import { useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import './Importation.css';

const labelsTitle = [
  'Filières',
  'Option filières',
  'Complexe',
  'Etablissement',
  'Formateur',
  'Module',

];

const Importation = () => {
  const [files, setFiles] = useState(Array(11).fill(null));

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.files[0];
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
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Télécharger Fichiers Excel</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-center">
          {labelsTitle.map((label, index) => (
            <div key={index} className="flex flex-col items-center w-full md:w-1/3 p-2">
              <label htmlFor={`fileInput${index}`} className="text-gray-600 mb-1 text-center">{label}</label>
              <FileUpload
                id={`fileInput${index}`}
                name={`fileInput${index}`}
                customUpload
                auto
                chooseLabel="Choisir"
                uploadLabel="Télécharger"
                cancelLabel="Annuler"
                onSelect={(e) => handleFileChange(e, index)}
                className="w-full file-upload-small"
              />
            </div>
          ))}
        </div>
        <Button label="Télécharger tous" type="submit" className="w-full p-button-success" />
      </form>
    </>
  );
};

export default Importation;
