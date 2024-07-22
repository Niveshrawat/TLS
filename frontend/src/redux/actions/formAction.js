// src/redux/actions.js
import { toast } from 'react-toastify';
import { submitShortTermCertificate } from '../../services/shortServices';

export const SUBMIT_FORM_REQUEST = 'SUBMIT_FORM_REQUEST';
export const SUBMIT_FORM_SUCCESS = 'SUBMIT_FORM_SUCCESS';
export const SUBMIT_FORM_FAILURE = 'SUBMIT_FORM_FAILURE';

export const submitForm = (formData) => async (dispatch) => {
  dispatch({ type: SUBMIT_FORM_REQUEST });
  try {
    const response = await submitShortTermCertificate(formData);
    dispatch({ type: SUBMIT_FORM_SUCCESS, payload: response });
    toast.success('Form submitted successfully');
  } catch (error) {
    dispatch({ type: SUBMIT_FORM_FAILURE, payload: error.message });
    toast.error(`Error: ${error.response ? error.response.data : error.message}`);
  }
};
