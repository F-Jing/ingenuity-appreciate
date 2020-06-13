let background = ['linear-gradient(0deg, #D5D6EA 0%, #F0F5FF 10%)', 'linear-gradient(0deg, #FDFBE9 0%, #EAE7D5 10%)', 'linear-gradient(0deg, #F1FFF0 0%, #DBEAD5 10%)', 'linear-gradient(0deg, #FFF0F0 0%, #EAD5D5 10%)']
const PAGE = {
  data: {
    message: [],
    background: background,
    itemWidth: 320,
    itemHeight: 158,
    item: null,
    itemOffsetTop: null,
    itemOffsetLeft: null,
    paddingOffset: 20,
    pageY: null,
    pageX: null,
    zIndex: 0,
    isLock: true,
  },
  init: function () {
    this.bind();
    this.render();
  },
  bind: function () {
    let messageList = document.getElementById('message-list');
    let messageInput = document.getElementById('message-input');
    let messageBtn = document.getElementsByClassName('message-btn')[0];
    messageInput.addEventListener('keyup', this.addMessage);
    messageBtn.addEventListener('click', this.addMessageBtn);
    this.onEventListener(messageList, 'mousedown', 'message-item', this.handleMousedown);
    window.addEventListener('mousemove', this.handleMousemove);
    window.addEventListener('mouseup', this.handleMouseup);
  },
  onEventListener(parenNode, action, childClassName, callback) {
    parenNode.addEventListener(action, function (e) {
      e.target.className.indexOf(childClassName) >= 0 && callback(e)
    })
  },
  handleMousedown: function (e) {
    let item = e.target;
    if(e.target.parentNode.className == 'message-item') {
      item = e.target.parentNode
    }
    PAGE.data.isLock = false;
    PAGE.data.itemOffsetLeft = item.offsetLeft;
    PAGE.data.itemOffsetTop = item.offsetTop;
    PAGE.data.pageX = e.pageX;
    PAGE.data.pageY = e.pageY;
    item.style.zIndex = ++PAGE.data.zIndex;
    PAGE.data.item = item
  },
  handleMousemove: function (e) {
    if (!PAGE.data.isLock) {
      let container = document.getElementById('message-list');
      let containerWidth = container.offsetWidth;
      let containerHeight = container.offsetHeight;
      let paddingOffset = PAGE.data.paddingOffset;
      let itemWidth = PAGE.data.itemWidth;
      let itemHeight = PAGE.data.itemHeight;
      let maxWidth = containerWidth - itemWidth - paddingOffset;
      let maxHeight = containerHeight - itemHeight - paddingOffset;
      let translateX = e.pageX - PAGE.data.pageX + PAGE.data.itemOffsetLeft;
      let translateY = e.pageY - PAGE.data.pageY + PAGE.data.itemOffsetTop;
      translateX = translateX > maxWidth ? maxWidth : translateX;
      translateY = translateY > maxHeight ? maxHeight : translateY;
      translateX = translateX < paddingOffset ? paddingOffset : translateX;
      translateY = translateY < paddingOffset ? paddingOffset : translateY;
      PAGE.data.item.style.left = translateX + 'px';
      PAGE.data.item.style.top = translateY + 'px';
    }
  },
  handleMouseup: function () {
    PAGE.data.isLock = true;
  },
  render: function () {
    let message = this.data.message;
    let itemWidth = this.data.itemWidth;
    let itemHeight = this.data.itemHeight;
    let paddingOffset = this.data.paddingOffset;
    let background = this.data.background;
    let zIndex = ++this.data.zIndex;
    let container = document.getElementById('message-list');
    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;
    let maxWidth = containerWidth - itemWidth - paddingOffset;
    let maxHeight = containerHeight - itemHeight - paddingOffset;
    maxWidth = maxWidth > containerWidth ? containerWidth : maxWidth;
    maxHeight = maxHeight > containerHeight ? containerHeight : maxHeight;
    maxWidth = maxWidth < paddingOffset ? paddingOffset : maxWidth;
    maxHeight = maxHeight < paddingOffset ? paddingOffset : maxHeight;
    let randomTop = this.randomBetween(maxHeight, paddingOffset);
    let randomLeft = this.randomBetween(maxWidth, paddingOffset);
    background = background[zIndex % background.length];
    let messageList = document.getElementById('message-list')
    let messageItem = document.createElement('li');
    if (message == false) {
      return
    } else {
      messageItem.setAttribute('class', 'message-item');
      let styleStr = `
    z-index:${zIndex};
    background:${background};
    background-size:100% 20px;
    top:${randomTop}px;
    left:${randomLeft}px;`
      messageItem.innerHTML = `
      <img class="message-item-icon-left" src="./image/message_bg_left.png" />
      <img class="message-item-icon-right" src="./image/message_bg_right.png" />
      <p class="message-item-name">小兔兔说：</p>
      <p class="message-item-content">${message.pop()}</p>`
      messageItem.setAttribute('style', styleStr);
      messageList.appendChild(messageItem);
    }
  },
  randomBetween: function (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  addMessage: function (e) {
    let value = this.value.trim();
    let message = PAGE.data.message;
    if (e.which !== 13 || !value) {
      return;
    }
    message.push(value);
    this.value = '';
    PAGE.render();
  },
  addMessageBtn: function () {
    let messageInput = document.getElementById('message-input');
    let value = messageInput.value.trim();
    let message = PAGE.data.message;
    if (!value) {
      return;
    }
    message.push(value);
    messageInput.value = '';
    PAGE.render();
  }
}
PAGE.init();



