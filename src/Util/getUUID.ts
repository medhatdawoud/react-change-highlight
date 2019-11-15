import defaults from "../consts";

const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const randomNum = Math.random() * 16 | 0;
    const finalChar = c === 'x' ? randomNum : (randomNum & 0x3 | 0x8);
    return finalChar.toString(16);
  });
}

export default getUUID;
