import moment from 'moment';
import Swal from 'sweetalert2';
import 'moment/dist/locale/vi';
import { toast } from 'react-toastify';

type Toast =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'default';

function customRound(number: number) {
  const decimalPart = number % 1;
  if (decimalPart === 0.5) return number - decimalPart;
  else return Math.round(number);
}

function toastMsg(
  content: string,
  type: Toast = 'default',
) {
  return toast[type](content, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
}

function generateSrcImage(link: string) {
  return import.meta.env.VITE_URL_SERVER + link;
}

function handleTextPrice(price: number | string) {
  price = Number(price);
  if (price >= 1000000) {
    return `${price / Math.pow(10, 6)} triệu/tháng`;
  } else if (price >= 100000 && price < 1000000) {
    const stringPrice = String(price);
    let result = '';
    for (let i = 0; i < stringPrice.length; i++) {
      result += stringPrice[stringPrice.length - (i + 1)];
      if ((i + 1) % 3 === 0 && i !== stringPrice.length - 1)
        result += '.';
    }
    return `${result
      .split('')
      .reverse()
      .join('')} đồng/tháng`;
  }
}

function handleTimeFromNow(time: string) {
  return moment(time, 'YYYYMMDD').fromNow();
}

function handleTime(time: string) {
  return moment(time).format('dddd, hh:mm DD/MM/YYYY');
}

function handleTextLong(text: string, index: number) {
  return text.length < index
    ? text
    : `${text.slice(0, index)}...`;
}

function handleSlug(string: string) {
  const a =
    'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
  const b =
    'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return string
    .toString()
    .toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(/\s+/g, '-')
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const localStorage = {
  getAuth: () => {
    const { auth } = JSON.parse(
      window.localStorage['persist:root'],
    );
    return JSON.parse(auth);
  },
  setTokenAuth: (login: boolean, token: string | null) => {
    const { auth } = JSON.parse(
      window.localStorage['persist:root'],
    );
    const newAuth = { ...JSON.parse(auth) };
    newAuth.token = token;
    newAuth.login = login;
    window.localStorage.setItem(
      'persist:root',
      JSON.stringify({ auth: JSON.stringify(newAuth) }),
    );
  },
};

const swal = {
  error: (title: string) => {
    return Swal.fire({
      icon: 'error',
      title: title,
      showConfirmButton: false,
      timer: 2000,
    });
  },
  success: (title: string) => {
    return Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000,
    });
  },
  warning: (title: string, timer: boolean = false) => {
    return Swal.fire({
      icon: 'warning',
      title: title,
      showConfirmButton: true,
      timer: timer ? 2000 : undefined,
    });
  },
  confirm: (title: string) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chấp nhận',
      cancelButtonText: 'Hủy',
    });
  },
};

export {
  localStorage,
  customRound,
  toastMsg,
  generateSrcImage,
  handleTextPrice,
  handleSlug,
  handleTimeFromNow,
  handleTextLong,
  handleTime,
  swal,
};
