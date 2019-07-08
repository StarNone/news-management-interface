export default {
  Register: '/admin/register', // 管理员注册
  Login: '/admin/login', // 管理员登陆
  getAdminMsg: '/admin/msg', // 获取管理员信息
  addCategory: '/category', // 添加分类
  getCategory: '/category', // 获取分类
  deleteCategory: '/category/', // 删除分类
  addSwiper: '/swiper', // 添加轮播图
  getSwiper: '/swiper', // 获取轮播图
  getSwiperById: '/swiper/details/', // 通过id获取轮播图内容
  deleteSwiper: '/swiper/', // 删除轮播图
  getAllUser: '/user/msg', // 获取用户信息
  manageUser: '/user/manage', // 用户管理操作
  getNews: '/news', // 获取新闻
  changeNews: '/news', // 新闻审核
  getNewsById: '/news/', // 通过id找新闻
  getCommentByUser: '/comment/user/', // 通过用户获取评论
  deleteComment: '/comment/', // 删除评论
  getUploadToken: '/uploadToken'
}
