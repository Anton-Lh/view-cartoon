//登陆
const login = '/auth/user_login'; 
//获取所有漫画
const getAllCartoon = '/comic/getComic';
//滚动栏
const banner = '/banner/getAllBanner';
//判断用户是否存在
const cheackUser = '/auth/getUserByUserphone';
//注册
const register = '/auth/user_CompleteSignup';
//获取漫画详情
const cartoonDetails = '/comic/getComicDetialByid';
//获取漫画评论
const comment = '/comiccomments/getComic_Comments';
//获取漫画内容
const content = '/comicpic/getComicPicByID';
//获取某人漫画收藏
const collection = '/comicCol/getComicColByUserid';
//添加吐槽
const addTuCao = '/tucao/addTucao';

module.exports={
  login,
  getAllCartoon,
  banner,
  cheackUser,
  register,
  cartoonDetails,
  comment,
  content,
  collection,
  addTuCao
}