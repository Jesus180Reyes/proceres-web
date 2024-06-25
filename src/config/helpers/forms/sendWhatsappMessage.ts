export const sendWhatsappMessage = (
  text: string,
  phoneNumber = 50489274672
): Window | null => {
  const message = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;
  return window.open(message);
};
