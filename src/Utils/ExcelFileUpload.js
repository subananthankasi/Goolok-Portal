import React from 'react';
import { read } from 'xlsx';
import * as XLSX from 'xlsx';
const ExcelFileUpload = ({ setExcelData ,fileInputRef}) => {


  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        const allFields = Object.keys(json[0]);
      json.map((obj) => {
          const newObj = {};
          allFields.forEach((field) => {
            newObj[field] = obj[field] || '';
          });
          return newObj;
        });

        json = json.map((obj) => {
          const newObj = {};
          allFields.forEach((field) => {
            newObj[field] = obj[field] || '';
          });
          return newObj;
        });
 
        setExcelData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div> 
      <input
        type="file"
        name="upload"
        className="form-control"
        id="upload"
        ref={fileInputRef}
        onChange={readUploadFile}
      />
    </div>
  );
};

export default ExcelFileUpload;
