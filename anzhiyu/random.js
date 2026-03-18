var posts=["2026/03/18/32/","2023/08/10/C语言/","2023/08/01/复试/","2026/02/05/复试回答加口试/","2023/08/01/简历回答/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };