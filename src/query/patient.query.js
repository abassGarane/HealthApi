export const QUERY = {
  SELECT_PATIENTS: "SELECT * FROM patients ORDER BY created_at DESC LIMIT 100",
  SELECT_PATIENT: "SELECT * FROM patients WHERE id = ?",
  CREATE_PATIENTS:
    "INSERT INTO patients(first_name,last_name,email,phone,address,diagnosis,image_url) VALUES(?,?,?,?,?,?,?)",
  DELETE_PATIENTS: "DELETE FROM patients WHERE id=?",
  UPDATE_PATIENTS:
    "UPDATE patients SET first_name = ?,last_name = ?,email = ?,phone = ?,address = ?,diagnosis = ?,image_url = ? WHERE id=?",
  CREATE_PATIENT_PROCEDURE:"CALL create_and_return(?,?,?,?,?,?,?)",
};
