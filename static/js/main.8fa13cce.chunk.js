(this["webpackJsonpweb-chat"]=this["webpackJsonpweb-chat"]||[]).push([[0],{57:function(e,n,t){},88:function(e,n,t){"use strict";t.r(n);var o,r,s,c,a,i,d,u=t(1),l=t.n(u),j=t(44),b=t.n(j),m=t(10),O=t(4),h=t(3),f=h.d.section(o||(o=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n"]))),g=h.d.section(r||(r=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  width: 100%;\n  padding: 0.4rem;\n  height: calc(100% - 36.1px);\n  overflow-y: scroll;\n  scrollbar-width: none;\n  &::-webkit-scrollbar {\n    display: none;\n  }\n"]))),v=h.d.div(s||(s=Object(O.a)(["\n  margin-top: auto;\n"]))),p=h.d.form(c||(c=Object(O.a)(["\n  display: flex;\n  position: relative;\n  width: 100%;\n  height: 36px;\n  background: #222;\n  align-items: center;\n"]))),x=h.d.div(a||(a=Object(O.a)(["\n  width: 20%;\n  background-color: #222;\n  border-radius: 6px 0 0 6px;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  padding-left: 0.3rem;\n"]))),D=h.d.div(i||(i=Object(O.a)(["\n  width: 70%;\n"]))),I=h.d.div(d||(d=Object(O.a)(["\n  width: 10%;\n"]))),w=t(0);var y,R,k=function(e){var n=e.chats,t=e.sendMessage,o=e.joinedUser,r=e.togglePrivateMessage,s=Object(u.useRef)(null),c=Object(u.useCallback)((function(e){var n;e.preventDefault();var o=null===s||void 0===s||null===(n=s.current)||void 0===n?void 0:n.value;o&&(t(o),e.target[0].value="")}),[t]),a=Object(u.useCallback)((function(){var e,n=null!==(e=null===o||void 0===o?void 0:o.userID)&&void 0!==e?e:null;r(n)}),[r,o]);return Object(u.useEffect)((function(){var e=document.querySelector(".chats");null===e||void 0===e||e.scrollTo(0,e.scrollHeight)}),[n]),Object(w.jsxs)(f,{className:"chat-area",children:[Object(w.jsxs)(g,{className:"chats",children:[Object(w.jsx)(v,{}),n.map((function(e,n){return Object(w.jsx)(T,{chat:e,togglePrivateMessage:r},"chat ".concat(n))}))]}),Object(w.jsxs)(p,{onSubmit:c,children:[Object(w.jsx)(x,{children:o?Object(w.jsxs)(ae,{type:"private-message",onClick:a,children:[o.userName," \uc5d0\uac8c"]}):Object(w.jsx)(ae,{type:"white",children:"\ubaa8\ub450\uc5d0\uac8c"})}),Object(w.jsx)(D,{children:Object(w.jsx)(ne,{ref:s,type:"text"})}),Object(w.jsx)(I,{children:Object(w.jsx)($,{children:Object(w.jsx)(ae,{type:"white",children:"\uc785\ub825"})})})]})]})},M=h.d.div(y||(y=Object(O.a)(["\n  width: 20%;\n  height: 100%;\n  overflow-y: scroll;\n  scrollbar-width: none;\n  &::-webkit-scrollbar {\n    display: none;\n  }\n  background: #222;\n"]))),U=h.d.div(R||(R=Object(O.a)(["\n  width: 80%;\n  height : 100%;\n  display: flex;\n  flex-direction: column;\n  .button-container {\n    display : flex;\n    justify-content : flex-end;\n    height : 30px;\n    button {\n      display: inline-block;\n      width: fit-content;\n      background: transparent;\n      border 1px solid #666;\n      border-radius : 3px;\n      padding : .1rem .3rem;\n      cursor : pointer;\n      margin-left : .3rem;\n    }\n  }\n"])));var E,C=function(e){var n;return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(M,{className:"users",children:null===(n=e.users)||void 0===n?void 0:n.map((function(n){return Object(w.jsx)(W,{user:n,togglePrivateMessage:e.toggleJoinedUser,joinedUser:e.joinedUser},n.userID)}))}),Object(w.jsxs)(U,{children:[e.children,Object(w.jsx)(k,{chats:e.chats,sendMessage:e.sendMessage,joinedUser:e.joinedUser,togglePrivateMessage:e.toggleJoinedUser})]})]})},N=(t(57),function(){return Object(w.jsx)("div",{className:"lds-spinner-wrap",children:Object(w.jsxs)("div",{className:"lds-spinner",children:[Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{}),Object(w.jsx)("div",{})]})})}),S=h.d.article(E||(E=Object(O.a)(["\n  cursor: ",";\n"])),(function(e){return"ancounce"!==e.type?" pointer":"normal"}));var J,P,_,T=function(e){var n=e.chat,t=e.togglePrivateMessage,o=n.content,r=n.from,s=n.to,c=n.fromSelf,a=Object(u.useMemo)((function(){return s||r?s?c?["\ub2f9\uc2e0\uc774 ".concat(s.userName,"\uc5d0\uac8c"),"private-message"]:c?[null,"public"]:["".concat(null===r||void 0===r?void 0:r.userName,"\ub2d8\uc774 \ub2f9\uc2e0\uc5d0\uac8c"),"private-message"]:[null===r||void 0===r?void 0:r.userName,"public-message"]:["\uacf5\uc9c0","anounce-message"]}),[r,s,c]),i=Object(m.a)(a,2),d=i[0],l=i[1],j=Object(u.useCallback)((function(){if(s&&r){var e=c?s.userID:r.userID;t(e)}}),[t,c,r,s]);return Object(w.jsx)(S,{type:l,onClick:j,children:Object(w.jsxs)(ae,{type:l,children:[Object(w.jsx)("b",{children:d})," : ",o]})})},L=h.d.article(J||(J=Object(O.a)(["\n  width : calc(98% / 3);\n  height : fit-content;\n  border : 1px solid;\n  border-color : ","}\n  border-radius : 3px;\n  margin-right : 1%;\n  padding : .2rem .4rem;\n  cursor : pointer;\n\n  @media screen and (max-width: 600px) {\n    width: calc(98% / 2);\n  }\n\n  * {\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n  }\n"])),(function(e){return e.isJoined?"tomato":"#444"})),A=h.d.div(P||(P=Object(O.a)(["\n  display: flex;\n  justify-content: space-between;\n"]))),G=h.d.div(_||(_=Object(O.a)(["\n  background-color: purple;\n  padding: 0.1rem 0.3rem;\n  border-radius: 3px;\n  font-size: 0.85rem;\n"])));var z,B,V=function(e){var n=e.room,t=e.enterRoom,o=e.joinRoom,r=Object(u.useCallback)((function(){if(n.isJoined)return t(n.roomID);o(n.roomID)}),[t,o,n]),s=Object(u.useMemo)((function(){return n.isJoined?[n.users[0].userName,n.users.length<2?null:n.users.length-1]:[null,null]}),[n.users,n.isJoined]),c=Object(m.a)(s,2),a=c[0],i=c[1];return Object(w.jsxs)(L,{isJoined:n.isJoined,onClick:r,children:[Object(w.jsx)(ae,{children:n.roomName}),n.isJoined?Object(w.jsxs)(A,{children:[Object(w.jsxs)(ae,{children:[a," ",i&&"+".concat(i)]}),0!==n.hasNewMessages&&Object(w.jsx)(G,{children:Object(w.jsx)(ae,{type:"white",children:n.hasNewMessages})})]}):Object(w.jsx)(ae,{children:"\ub300\ud654\ubc29\uc5d0 \ucc38\uc5ec\ud558\uc138\uc694!"})]})},q=h.d.article(z||(z=Object(O.a)(["\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-item: center;\n  ",";\n  padding: 0.2rem 0.4rem;\n"])),(function(e){return e.isPrivate?"background-color : #fff; color : black":"background-color : transparent; color : #f2f2f2"})),F=h.d.div(B||(B=Object(O.a)(["\n  background-color: purple;\n  padding: 0.1rem 0.3rem;\n  border-radius: 3px;\n  font-size: 0.85rem;\n"])));var H,W=function(e){var n=e.user,t=e.togglePrivateMessage,o=e.joinedUser,r=Object(u.useCallback)((function(){n.userID&&t(n.userID)}),[t,n]);return Object(w.jsxs)(q,{isPrivate:n.userID===(null===o||void 0===o?void 0:o.userID),onClick:r,children:[Object(w.jsx)(ae,{children:n.userName}),n.messages&&0!==n.messages.hasNewMessages&&Object(w.jsx)(F,{children:Object(w.jsx)(ae,{type:"white",children:n.messages.hasNewMessages})})]})},K=t(2),Q=t(20),X=h.d.button(H||(H=Object(O.a)(["\n  width: 100%;\n  height: 100%;\n  background: none;\n  cursor: pointer;\n  padding: 0.3rem 0.2rem;\n\n  ","\n"])),(function(e){var n=e.theme,t=e.border;return n.button[t]}));var Y,Z,$=function(e){var n=e.border,t=void 0===n?"borderless":n,o=e.children,r=Object(Q.a)(e,["border","children"]);return Object(w.jsx)(X,Object(K.a)(Object(K.a)({border:t},r),{},{children:o}))},ee=h.d.input(Y||(Y=Object(O.a)(["\n  width: 100%;\n  height: 100%;\n  border: 0;\n  padding: 0.2rem 0.4rem;\n  outline: none;\n  border-radius: 6px;\n"]))),ne=Object(u.forwardRef)((function(e,n){var t=Object.assign({},e);return Object(w.jsx)(ee,Object(K.a)({ref:n},t))})),te=h.d.div(Z||(Z=Object(O.a)(["\n  width: 100%;\n  height: 100%;\n  ","\n"])),(function(e){var n=e.theme,t=e.type,o=void 0===t?"default":t;return n.font[o]}));var oe,re,se,ce,ae=function(e){var n=e.children,t=e.type,o=Object(Q.a)(e,["children","type"]);return Object(w.jsx)(te,Object(K.a)(Object(K.a)({type:t},o),{},{children:n}))},ie=h.d.article(oe||(oe=Object(O.a)(["\n  display: flex;\n  height: 100%;\n  .chat-area {\n    height: 40%;\n  }\n"]))),de=h.d.section(re||(re=Object(O.a)(["\n  height: 60%;\n  padding: 0.5rem;\n"]))),ue=h.d.section(se||(se=Object(O.a)(["\n  width: 100%;\n  height: 30px;\n  display: flex;\n  justify-content: flex-end;\n\n  & button {\n    width: fit-content;\n  }\n"]))),le=h.d.section(ce||(ce=Object(O.a)(["\n  height: calc(99% - 30.1px);\n  padding-top: 0.5rem;\n  display: flex;\n  flex-wrap: wrap;\n  overflow-y: scroll;\n  scrollbar-width: none;\n  &::-webkit-scrollbar {\n    display: none;\n  }\n"])));function je(e){var n=e.users,t=e.chats,o=e.rooms,r=e.joinedUser,s=e.toggleJoinedUser,c=e.joinRoom,a=e.enterRoom,i=e.createRoom,d=e.sendMessage,l=Object(u.useMemo)((function(){return Object.values(o).sort((function(e){return e.isJoined?-1:0}))}),[o]),j=Object(u.useMemo)((function(){return Object.values(n).sort((function(e,n){return e.self?-1:n.self?1:e.messages.recent>n.messages.recent?-1:0}))}),[n]);return Object(w.jsx)(ie,{children:Object(w.jsx)(C,{joinedUser:r,toggleJoinedUser:s,sendMessage:d,chats:t,users:j,children:Object(w.jsxs)(de,{children:[Object(w.jsx)(ue,{children:Object(w.jsx)($,{border:"border",onClick:i,children:"\ubc29 \ub9cc\ub4e4\uae30"})}),Object(w.jsx)(le,{children:l.map((function(e){return Object(w.jsx)(V,{room:e,enterRoom:a,joinRoom:c},e.roomID)}))})]})})})}var be,me,Oe,he,fe,ge,ve,pe,xe=l.a.memo(je),De=h.d.section(be||(be=Object(O.a)(["\n  width: 300px;\n  position: relative;\n  top: 30%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"]))),Ie=h.d.h2(me||(me=Object(O.a)(["\n  text-align: center;\n"]))),we=h.d.form(Oe||(Oe=Object(O.a)(["\n  height: 30px;\n"]))),ye=h.d.div(he||(he=Object(O.a)(["\n  display: inline-block;\n  width: 80%;\n  border-bottom: 1px solid #222;\n  outline: none;\n  padding: 0.1rem 0.3rem;\n"]))),Re=h.d.div(fe||(fe=Object(O.a)(["\n  display: inline-block;\n  width: 20%;\n  padding: 0.1rem 0.3rem;\n  height: 100%;\n"]))),ke=function(e){var n=e.connectSocket,t=Object(u.useRef)(null),o=Object(u.useCallback)((function(e){var o;e.preventDefault();var r=null===t||void 0===t||null===(o=t.current)||void 0===o?void 0:o.value;r&&n(r)}),[n,t]);return Object(w.jsxs)(De,{children:[Object(w.jsx)(Ie,{children:"Web Chat"}),Object(w.jsxs)(we,{onSubmit:o,children:[Object(w.jsx)(ye,{children:Object(w.jsx)(ne,{ref:t,type:"text",autoComplete:"off",placeholder:"user name..."})}),Object(w.jsx)(Re,{children:Object(w.jsx)($,{border:"border",children:"\uc785\uc7a5"})})]})]})},Me=l.a.memo(ke),Ue=h.d.article(ge||(ge=Object(O.a)(["\n  display: flex;\n  height: 100%;\n  .chat-area {\n    height: calc(100% - 46.1px);\n  }\n"]))),Ee=h.d.section(ve||(ve=Object(O.a)(["\n  padding: 0.5rem;\n  height: fit-content;\n"]))),Ce=h.d.section(pe||(pe=Object(O.a)(["\n  width: 100%;\n  height: 30px;\n  display: flex;\n  justify-content: flex-end;\n\n  & button {\n    width: fit-content;\n    margin-left: 0.3rem;\n  }\n"])));function Ne(e){var n=e.joinedRoom,t=e.joinedUser,o=e.leaveRoom,r=e.goLoby,s=e.toggleJoinedUser,c=e.sendMessage,a=Object(u.useCallback)((function(){o(n.roomID)}),[o,n]);return Object(w.jsx)(Ue,{children:Object(w.jsx)(C,{joinedUser:t,toggleJoinedUser:s,sendMessage:c,chats:n.messages,users:n.users,children:Object(w.jsx)(Ee,{children:Object(w.jsxs)(Ce,{children:[Object(w.jsx)($,{border:"border",onClick:a,children:"\ub098\uac00\uae30"}),Object(w.jsx)($,{border:"border",onClick:r,children:"\ub85c\ube44\ub85c \uc774\ub3d9"})]})})})})}var Se=l.a.memo(Ne),Je=t(48),Pe=Object(Je.io)("http://localhost:3001/web-chat",{autoConnect:!1});Pe.onAny((function(e){}));var _e,Te,Le="USER_CONNECTED",Ae="USER_DISCONNECTED",Ge="TOGGLE_JOINED_USER",ze="LEAVE_ROOM",Be="JOIN_ROOM",Ve="CREATE_ROOM",qe="DELETE_ROOM",Fe="ENTER_ROOM",He="SET_USERS_ROOMS",We="PRIVATE_MESSAGE",Ke="PUBLIC_MESSAGE",Qe="ROOM_MESSAGE",Xe=t(13),Ye=t(11),Ze={chats:[],users:{},rooms:{},joinedRoomID:null,joinedUser:null};function $e(e,n){switch(n.type){case He:var t=n.rooms,o=n.users,r={},s={};return t.forEach((function(n){e.rooms[n.roomID]&&(r[n.roomID]=e.rooms[n.roomID]),e.rooms[n.roomID]||(r[n.roomID]=n)})),o.forEach((function(n){e.users[n.userID]&&(s[n.userID]=e.users[n.userID]),e.users[n.userID]||(s[n.userID]=n)})),Object(K.a)(Object(K.a)({},e),{},{users:s,rooms:r,joinedRoomID:null});case Fe:var c=n.roomID,a=Object(K.a)({},e.rooms);return a[c]=Object(K.a)(Object(K.a)({},e.rooms[c]),{},{hasNewMessages:0}),Object(K.a)(Object(K.a)({},e),{},{rooms:a,joinedRoomID:c});case Be:var i=n.roomID,d=n.userID,u=n.roomUsers,l=n.userName,j=Object(K.a)({},e.rooms[i]),b=Pe.userID===d;j.isJoined=!0;var m=u.map((function(e){return e.self=!1,e.userID===Pe.userID&&(e.self=!0),e}));j.users=m,j.messages.push({content:"".concat(l,"\ub2d8\uc774 \uc785\uc7a5\ud558\uc168\uc2b5\ub2c8\ub2e4.")});var O=Object(K.a)(Object(K.a)({},e.rooms),{},Object(Ye.a)({},i,j));return Object(K.a)(Object(K.a)({},e),{},{rooms:O,joinedRoomID:b?i:e.joinedRoomID});case ze:var h=n.roomID,f=n.roomUsers,g=n.userID,v=n.userName,p=n.users,x=n.rooms;if(Pe.userID===g){var D={},I={};return x.forEach((function(n){e.rooms[n.roomID]&&(D[n.roomID]=e.rooms[n.roomID]),e.rooms[n.roomID]||(D[n.roomID]=n)})),p.forEach((function(n){e.users[n.userID]&&(I[n.userID]=e.users[n.userID]),e.users[n.userID]||(I[n.userID]=n)})),Object(K.a)(Object(K.a)({},e),{},{rooms:D,users:I,joinedRoomID:null})}var w=Object(K.a)({},e.rooms[h]);w.users=f,w.messages.push({content:"".concat(v,"\ub2d8\uc774 \ud1f4\uc7a5\ud558\uc168\uc2b5\ub2c8\ub2e4.")});var y=Object(K.a)(Object(K.a)({},e.rooms),{},Object(Ye.a)({},h,w));return Object(K.a)(Object(K.a)({},e),{},{rooms:y});case Qe:var R=n.message,k=n.roomID,M=Object(K.a)({},e.rooms[k]),U=[].concat(Object(Xe.a)(M.messages),[R]);M.messages=U,e.joinedRoomID||M.hasNewMessages++;var E=Object(K.a)(Object(K.a)({},e.rooms),{},Object(Ye.a)({},k,M));return Object(K.a)(Object(K.a)({},e),{},{rooms:E});case We:var C,N,S=n.message,J=S.from.userID===Pe.userID,P=Object(K.a)({},e.rooms),_=Object(Xe.a)(e.chats),T=Object(K.a)({},e.users),L=T[null===(C=S.from)||void 0===C?void 0:C.userID];if(_.push(Object(K.a)(Object(K.a)({},S),{},{fromSelf:J})),e.joinedRoomID){var A=Object(K.a)({},P[e.joinedRoomID]);A.messages.push(Object(K.a)(Object(K.a)({},S),{},{fromSelf:J})),P[e.joinedRoomID]=A}return J||(null===(N=e.joinedUser)||void 0===N?void 0:N.userID)===L.userID||(L.messages.hasNewMessages++,L.messages.recent=new Date),Object(K.a)(Object(K.a)({},e),{},{rooms:P,chats:_,users:T});case Ke:var G=n.message,z=[].concat(Object(Xe.a)(e.chats),[Object(K.a)({},G)]);return Object(K.a)(Object(K.a)({},e),{},{chats:z});case Ge:var B,V=n.userID,q=e.users[V],F=(null===(B=e.joinedUser)||void 0===B?void 0:B.userID)===V?null:Object(K.a)({},q),H=Object(K.a)({},e.users);return H[V].messages.hasNewMessages=0,Object(K.a)(Object(K.a)({},e),{},{users:H,joinedUser:F});case Le:var W=n.user,Q=Object(K.a)(Object(K.a)({},e.users),{},Object(Ye.a)({},W.userID,W)),X=[].concat(Object(Xe.a)(e.chats),[{content:"".concat(W.userName,"\ub2d8\uc774 \uc785\uc7a5\ud558\uc168\uc2b5\ub2c8\ub2e4.")}]);return Object(K.a)(Object(K.a)({},e),{},{users:Q,chats:X});case Ae:var Y,Z=n.userID,$=n.userName,ee=Object(Xe.a)(e.chats),ne={},te=Object.values(e.users),oe=(null===(Y=e.joinedUser)||void 0===Y?void 0:Y.userID)===Z,re=e.joinedUser,se="".concat($,"\ub2d8\uc774 \ud1f4\uc7a5\ud558\uc168\uc2b5\ub2c8\ub2e4.");return oe&&(se="\uadd3\uc18d\ub9d0 \ub300\uc0c1\uc778 ".concat($,"\ub2d8\uc774 \ud1f4\uc7a5\ud558\uc168\uc2b5\ub2c8\ub2e4."),re=null),ee.push({content:se}),te.forEach((function(e){e.userID!==Z&&(ne[e.userID]=e)})),Object(K.a)(Object(K.a)({},e),{},{chats:ee,users:ne,joinedUser:re});case Ve:var ce=n.room,ae=ce.creater===Pe.userID?ce.roomID:e.joinedRoomID,ie=ce.creater===Pe.userID;ce.isJoined=ie;var de=Object(K.a)(Object(K.a)({},e.rooms),{},Object(Ye.a)({},ce.roomID,ce));return Object(K.a)(Object(K.a)({},e),{},{rooms:de,joinedRoomID:ae});case qe:var ue=n.roomID,le={};return Object.values(e.rooms).forEach((function(e){e.roomID!==ue&&(le[e.roomID]=e)})),Object(K.a)(Object(K.a)({},e),{},{rooms:le});default:return e}}var en=h.d.div(_e||(_e=Object(O.a)(["\n  max-width: 900px;\n  min-width: 300px;\n  margin: 0 auto;\n  height: 100vh;\n"]))),nn=h.d.main(Te||(Te=Object(O.a)(["\n  width: 100%;\n  height: 100%;\n"])));var tn,on,rn,sn,cn,an,dn=function(){var e=Object(u.useState)(!1),n=Object(m.a)(e,2),t=n[0],o=n[1],r=Object(u.useState)(!1),s=Object(m.a)(r,2),c=s[0],a=function(e,n){var t=Object(u.useReducer)($e,Ze),o=Object(m.a)(t,2),r=o[0],s=o[1],c=r.joinedRoomID,a=Object(u.useCallback)((function(){n(!0),Pe.emit("go loby")}),[n]),i=Object(u.useCallback)((function(e){e!==Pe.userID&&s({type:Ge,userID:e})}),[]),d=Object(u.useCallback)((function(e){var n=e.content,t=e.roomID;Pe.emit("room message",{content:n,roomID:t})}),[]),l=Object(u.useCallback)((function(e){Pe.emit("private message",e)}),[]),j=Object(u.useCallback)((function(e){Pe.emit("public message",e)}),[]),b=Object(u.useCallback)((function(){Pe.emit("create room")}),[]),O=Object(u.useCallback)((function(e){Pe.emit("join room",e)}),[]),h=Object(u.useCallback)((function(e){s({type:Fe,roomID:e})}),[]),f=Object(u.useCallback)((function(e){Pe.emit("leave room",e)}),[]),g=Object(u.useCallback)((function(t){e(!0),console.log("?"),n(!0),Pe.auth={userName:t},Pe.connect()}),[e,n]);return Object(u.useEffect)((function(){return Pe.on("session",(function(e){Pe.userID=e})),Pe.on("users rooms",(function(e){var t=e.users,o=e.rooms;n(!1),s({type:He,users:t,rooms:o})})),Pe.on("join room",(function(e){var n=e.roomUsers,t=e.userID,o=e.userName,r=e.roomID;s({type:Be,roomUsers:n,userID:t,userName:o,roomID:r})})),Pe.on("leave room",(function(e){var t=e.roomUsers,o=e.userID,r=e.userName,c=e.roomID,a=e.users,i=e.rooms;n(!1),s({type:ze,roomUsers:t,userID:o,userName:r,roomID:c,users:a,rooms:i})})),Pe.on("room message",(function(e){var n=e.message,t=e.roomID;s({type:Qe,message:n,roomID:t})})),Pe.on("private message",(function(e){s({type:We,message:e})})),function(){Pe.disconnect()}}),[n]),Object(u.useEffect)((function(){return c||(Pe.on("room created",(function(e){s({type:Ve,room:e})})),Pe.on("delete room",(function(e){s({type:qe,roomID:e})})),Pe.on("public message",(function(e){s({type:Ke,message:e})})),Pe.on("user connected",(function(e){s({type:Le,user:e})})),Pe.on("user disconnected",(function(e){var n=e.userID,t=e.userName;s({type:Ae,userID:n,userName:t})}))),function(){Pe.off("room created"),Pe.off("delete room"),Pe.off("public message"),Pe.off("user connected"),Pe.off("user disconnected")}}),[c]),{state:r,handleGoLoby:a,handleEnterRoom:h,handleToggleJoinedUser:i,handleSendRoomMessage:d,handleSendPrivateMessage:l,handleSendPublicMessage:j,handleCreateRoom:b,handleJoinRoom:O,handleLeaveRoom:f,handleConnectSocket:g}}(o,s[1]),i=a.state,d=i.chats,l=i.users,j=i.rooms,b=i.joinedRoomID,O=i.joinedUser,h=Object(u.useCallback)((function(e){return O?a.handleSendPrivateMessage({content:e,to:O}):b?a.handleSendRoomMessage({content:e,roomID:b}):a.handleSendPublicMessage(e)}),[O,b]);return Object(w.jsx)(en,{children:Object(w.jsxs)(nn,{children:[c&&Object(w.jsx)(N,{}),!t&&Object(w.jsx)(Me,{connectSocket:a.handleConnectSocket}),t&&b&&Object(w.jsx)(Se,{joinedRoom:j[b],joinedUser:O,leaveRoom:a.handleLeaveRoom,goLoby:a.handleGoLoby,toggleJoinedUser:a.handleToggleJoinedUser,sendMessage:h}),t&&!b&&Object(w.jsx)(xe,{users:l,chats:d,rooms:j,joinedUser:O,toggleJoinedUser:a.handleToggleJoinedUser,joinRoom:a.handleJoinRoom,enterRoom:a.handleEnterRoom,createRoom:a.handleCreateRoom,sendMessage:h})]})})},un={font:{white:Object(h.c)(tn||(tn=Object(O.a)(["\n      color: #fff;\n    "]))),"private-message":Object(h.c)(on||(on=Object(O.a)(["\n      color: rgba(245, 81, 226, 1);\n    "]))),"anounce-message":Object(h.c)(rn||(rn=Object(O.a)(["\n      color: green;\n    "])))},button:{borderless:Object(h.c)(sn||(sn=Object(O.a)(["\n      border: 0;\n    "]))),border:Object(h.c)(cn||(cn=Object(O.a)(["\n      border: 1px solid black;\n      border-radius: 3px;\n    "])))}},ln=Object(h.b)(an||(an=Object(O.a)(["\n  * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n  }\n"])));b.a.render(Object(w.jsxs)(h.a,{theme:un,children:[Object(w.jsx)(ln,{}),Object(w.jsx)(dn,{})]}),document.getElementById("root"))}},[[88,1,2]]]);
//# sourceMappingURL=main.8fa13cce.chunk.js.map