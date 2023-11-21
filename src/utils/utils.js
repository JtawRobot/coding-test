import Tooltip from "../components/UtilComponents/Tooltip";

export const initialUsers = [
  {
    checked: false,
    id: 'johndoe',
    firstName: 'john',
    lastName: 'doe',
    email: 'johnDoe@email.com',
    status: 'REGISTERED',
    created: new Date(),
  },
  {
    checked: false,
    id: 'richardsmith',
    firstName: 'richard',
    lastName: 'smith',
    email: 'richardsmith@email.com',
    status: 'INITIATED',
    created: new Date(),
  },
];


export const showText = (text, limit=20) => {
  if (text?.length > limit) {
    return (
      <>
      <Tooltip text={text}  label={`${text.slice(0,limit-3)}...`} /> 
      </>
    ) 
  }
  return text || '';
};

export const validateEmail = (email) => {
  const emailCorrectPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const testResult = emailCorrectPattern.test(email.toLowerCase());
  return testResult;
};

export const debouncer = (func, timeinms) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, timeinms);
  };
};

export const evaluateSearch = (data, searchString="") => {
    return data?.id?.includes(searchString) || data?.firstName?.includes(searchString) || data?.lastName?.includes(searchString) || data?.email?.includes(searchString);
};