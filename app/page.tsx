"use client";
import { useState, useRef, useEffect } from "react";

const SUPPORT_LINKS = {
  liveChat: "#",
  whatsapp: "https://whatsapp.com/channel/0029VbCDmwv1t90lofOvMM2J",
  wechat: "#",
  kakao: "#",
};

const CHANNEL_LINKS = {
  whatsappChannel: "https://whatsapp.com/channel/0029VbCDmwv1t90lofOvMM2J",
  wechat: "#",
  kakaoChannel: "#",
};

const FOOTER_INFO = {
  brand: "KSIM",
  company: "Starphones / N2L",
  email: "starphones@naver.com",
  supportHours: "Mon-Fri 10:00-18:00 (KST)",
};

const PWA_CONFIG = { enabled: false };

const mustHaveApps = [
  {
    name: "Naver Map / Kakao Map",
    description: { en:"Navigation and directions in Korea", zh:"韩国地图和路线导航", ko:"한국 길찾기 / 지도 앱", ja:"韓国の地図・ナビアプリ" },
    icon: "/images/apps/map.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "Papago",
    description: { en:"Translation app", zh:"翻译应用", ko:"번역 앱", ja:"翻訳アプリ" },
    icon: "/images/apps/papago.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "Kakao T",
    description: { en:"Taxi booking app", zh:"出租车叫车应用", ko:"택시 호출 앱", ja:"タクシー配車アプリ" },
    icon: "/images/apps/kakao-t.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "k.ride",
    description: { en:"Foreigner-friendly taxi app with overseas card payment", zh:"面向外国用户的出租车应用，支持海外银行卡支付", ko:"외국인 친화 택시 앱 / 해외카드 결제 가능", ja:"外国人向けタクシーアプリ・海外カード対応" },
    icon: "/images/apps/k-ride.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "KakaoTalk",
    description: { en:"Messaging app used in Korea", zh:"韩国常用聊天应用", ko:"한국에서 많이 쓰는 메신저 앱", ja:"韓国で広く使われるメッセージアプリ" },
    icon: "/images/apps/kakaotalk.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "Subway Korea",
    description: { en:"Subway route and transfer guide", zh:"地铁路线和换乘查询应用", ko:"지하철 노선 / 환승 안내 앱", ja:"地下鉄路線・乗り換え案内アプリ" },
    icon: "/images/apps/subway-korea.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
];

const SEC = {
  HOME:"home", START:"start", IPHONE:"iphone", ANDROID:"android",
  NOT_WORKING:"notWorking", CONTACT:"contact", CHANNEL:"channel",
};

const C = {
  en: {
    langLabel:"English",
    hero:{ sub:"Having trouble with your SIM?", desc:"Please choose your language and follow the setup guide." },
    menu:{ start:"Start Guide", iphone:"iPhone Setting", android:"Android Setting", notWorking:"SIM Not Working", contact:"Contact Support", channel:"Airport Arrival Guide" },
    startGuide:{ title:"Start Guide", steps:["⚠️ IMPORTANT: If you have another SIM card or eSIM (from your home country, airline, or roaming plan) already active on your phone, please disable its data before using KSIM. Having two data connections active at the same time can cause very slow speeds or connection failures.","Open the SIM card tray using the ejector pin (included in the SIM package). Insert the KSIM SIM card into the tray and push it back in gently.","Turn off your phone completely, then turn it back on. This helps the phone recognize the new SIM card.","Go to Settings and turn on Mobile Data (also called Cellular Data). Make sure it is switched ON.","If your phone has dual SIM or an eSIM registered, go to Settings > Cellular (or Mobile Data) and set KSIM as the default data line. Turn off data for any other SIM or eSIM.","Go to Settings > Mobile Data > Mobile Data Options and turn on Data Roaming. This is required to use data in Korea.","Go to Settings > Mobile Data > Network Selection and set it to Automatic. Your phone will find the best available network.","Wait 1 to 3 minutes after restarting. You should see the network name appear in the top bar. Try opening a webpage to confirm the connection.","If data still does not work after 5 minutes, try turning Airplane Mode on for 10 seconds, then off again. If the issue continues, contact KSIM support."] },
    iphone:{ title:"iPhone Setting", steps:["Go to Settings (the gear icon on your home screen).","Tap Cellular (or Mobile Data depending on your region).","⚠️ If you have a home country eSIM or another SIM active, tap on it and turn off its data or disable the line. Go to Settings > Cellular > Cellular Data and make sure only KSIM is selected as the data line. Using two data lines at the same time will cause slow speeds or connection failures.","Make sure Cellular Data is turned ON (green toggle) for the KSIM SIM.","Tap Cellular Data Options (or Mobile Data Options).","Turn on Data Roaming. A warning may appear — tap OK to confirm.","Go back and tap Network Selection.","Turn off the Automatic toggle, wait 5 seconds, then turn it back ON. Your iPhone will search for available networks.","Go back to the home screen and restart your iPhone by holding the side button. After restart, wait 1-3 minutes and check if data is working.","If you see No Service or SOS Only at the top, try toggling Airplane Mode on and off. If the issue continues, contact KSIM support."] },
    android:{ title:"Android Setting", steps:["Go to Settings (the gear icon in your app drawer or notification panel).","Tap Connections (on Samsung) or Network & Internet (on other Android phones).","⚠️ If you have dual SIM or an eSIM registered, tap SIM Card Manager (or SIM & Network). Make sure KSIM is set as the preferred data SIM and turn off data for any other SIM or eSIM. Using two data connections at the same time will cause slow speeds or failures.","Tap Mobile Networks (or SIM Card & Mobile Networks).","Make sure Mobile Data is turned ON.","Turn on Data Roaming. This is required for KSIM SIM to work in Korea.","Tap Network Mode and select Auto Connect or LTE/3G/2G (Auto). This allows your phone to find the best signal.","Tap Network Operators (or Automatically Select Network) and set it to Automatic.","Restart your phone. After restarting, wait 1-3 minutes for the network to connect.","If data does not work, go back to Mobile Networks and check if APN settings are needed. Contact KSIM support for APN details if required."] },
    notWorking:{
      title:"SIM Not Working",
      issues:{
        notDetected:{ label:"SIM Not Detected", steps:["Turn off your phone completely before checking the SIM card.","Remove the SIM card tray using the ejector pin. Take out the SIM card and check for any dust or damage.","Reinsert the SIM card carefully, making sure it is seated correctly in the tray. Push the tray back in firmly.","Turn on your phone and wait for it to fully boot up. Check if the SIM card is now detected.","If your phone has two SIM slots, try inserting the KSIM SIM into the other slot.","If possible, test the KSIM SIM card in another phone to check if the card itself is working.","If the SIM is still not detected, the card may be damaged or incompatible. Please contact KSIM support with a photo of your SIM card and phone model."] },
        noSignal:{ label:"No Signal / SOS Only", steps:["Check the top of your screen. If you see No Service or SOS Only, your phone is not connected to a network.","Turn Airplane Mode ON, wait 10 seconds, then turn it OFF. This resets the network connection.","Go to Settings > Mobile Networks > Network Selection and make sure it is set to Automatic.","Restart your phone completely and wait 2-3 minutes after it turns back on.","Move to a different location. Some indoor areas or basements may have weak signal.","Check if Data Roaming is turned ON. Without roaming, KSIM SIM cannot connect in Korea.","If you still have no signal after trying all steps, please contact KSIM support with your phone model and current location."] },
        dataNotWorking:{ label:"Data Not Working / Very Slow", steps:["Check that Mobile Data (Cellular Data) is turned ON in your Settings.","Check that Data Roaming is turned ON. This is the most common reason data does not work.","⚠️ If you have a home country eSIM or another SIM active at the same time as KSIM, this is very likely causing slow speeds or connection failures. Go to Settings > Cellular (iPhone) or SIM Card Manager (Android) and make sure only KSIM is set as the active data line. Disable data on all other SIMs or eSIMs.","Try turning Airplane Mode ON for 10 seconds, then OFF again. This resets the network.","Restart your phone and wait 2-3 minutes for the network to reconnect.","Open your browser and try loading a simple website like google.com to test the connection.","If data still does not work, you may need to set the APN manually. Contact KSIM support and we will send you the correct APN settings for your phone."] },
        esim:{ label:"eSIM Not Activated", steps:["First, confirm your phone supports eSIM. Go to the dial pad and type *#06# — if an EID number appears, your phone supports eSIM.","Make sure you are connected to Wi-Fi before scanning the eSIM QR code. eSIM activation requires an internet connection.","Open your phone's camera and scan the QR code provided by KSIM. On iPhone: Settings > Cellular > Add eSIM. On Android: Settings > Network > SIM > Add eSIM.","Follow the on-screen instructions to complete the installation. Do not close the screen during the process.","After installation, restart your phone. Go to Settings and make sure the KSIM eSIM is set as the active data line.","Turn on Data Roaming for the KSIM eSIM profile. This is required to use data in Korea.","If activation fails or the QR code does not work, please contact KSIM support immediately. Do not scan the QR code more than 3 times as it may become invalid."] },
        refund:{ label:"Refund / Exchange", steps:["Please contact KSIM support as soon as possible with a clear photo of the SIM card package (front and back).","Tell us your purchase location, purchase date, and the problem you are experiencing.","Also provide your phone model and whether the SIM was ever inserted into a phone.","Refund or exchange may be limited if the SIM was already activated or used.","If the issue is caused by an unsupported phone (e.g. carrier-locked device or incompatible model), we may not be able to offer a refund.","Our support team will review your case and respond within 24 hours."] },
      }
    },
    contact:{
      title:"Contact Support",
      prepare:"Before contacting support, please prepare your phone model, SIM number, purchase location, and screenshot.",
      channels:{ whatsapp:"WhatsApp" },
      form:{ title:"Submit a Support Request", name:"Name", phoneModel:"Phone Model", simNumber:"SIM Number / ICCID", purchaseLoc:"Purchase Location", issueType:"Issue Type", issueOptions:["SIM Not Detected","No Signal","Data Not Working","eSIM Not Activated","Refund / Exchange","Other"], screenshot:"Upload Screenshot", message:"Message", submit:"Submit Support Request", success:"Thank you. Our support team will contact you soon." },
    },
    channel:{
      title:"Airport Arrival Guide",
      intro:"Essential tips after arriving in Korea.",
      channelCtaTitle:"Follow KSIM Channel",
      channelCtaDesc:"Follow our channel for SIM setup help, airport arrival tips, special offers, and long-term stay updates.",
      buttons:{ whatsapp:"Follow WhatsApp Channel", wechat:"Add WeChat", kakao:"Add KakaoTalk Channel" },
      disclaimer:"By following our channel, you may receive KSIM updates and promotional information. You can unfollow anytime.",
      arrival:{ title:"Airport Arrival Guide", cards:[
        { icon:"📶", title:"SIM Setup First", body:"After purchasing KSIM at the airport, insert the SIM card and restart your phone.\nTurn on Mobile Data and Data Roaming.\nSet Network Selection to Automatic and wait 1-3 minutes." },
        { icon:"📡", title:"Airport Wi-Fi", body:"If your SIM is not connected yet, use airport Wi-Fi first.\nThen open KSIM Support and follow the setup guide or contact support." },
        { icon:"✅", title:"Before Leaving the Airport", list:["Check your SIM connection","Connect to airport Wi-Fi if needed","Download essential apps","Buy or top up T-money","Save your hotel address","Save KSIM support contact"] },
        { icon:"🚇", title:"Transportation / T-money", body:"From the airport, you can use AREX, airport bus, subway, or taxi.",
          tmoney:{
            t1:{ label:"Terminal 1 (T1)", items:["CU near Exit 5, Exit 11, or Exit 13 on the 1st floor Arrivals","B1 Transportation Center near AREX entrance"] },
            t2:{ label:"Terminal 2 (T2)", items:["GS25 near Arrival Hall A on the 1st floor","CU near Exit 10 on the 1st floor","CU at the center of B1 Transportation Center"] },
            topup:{ label:"How to top up", items:["Convenience stores","Subway station ticket machines","Airport Railroad / AREX area"] },
            use:{ label:"Where to use", items:["Subway","Bus","Convenience stores","Some taxis"] },
          },
          tip:"Availability may vary by store. If one store does not have a T-money card, please check another convenience store or the AREX area." },
        { icon:"🚕", title:"Taxi App / Payment", body:"", taxiApps:[{ name:"Kakao T", desc:"Most widely used taxi app in Korea.\nYou may be able to use Kakao T with an international phone number.\nIf you do not have a Korean card, choose Pay to Driver.\nYou can usually pay by cash, credit card, or T-money." },{ name:"k.ride", desc:"Foreigner-friendly taxi app by Kakao Mobility.\nSupports Google/Apple login and overseas card payment.\nGood for travelers who want easier in-app payment." },{ name:"Uber", desc:"Uber is also available in Korea for requesting local taxis.\nUseful if you already have an Uber account.\nHowever, Kakao T and k.ride are usually more commonly recommended." }], tip:"Download taxi apps while connected to airport Wi-Fi." },
        { icon:"📱", title:"Must-have Apps", body:"", useMustHaveApps:true, tip:"Download apps while using airport Wi-Fi." },
        { icon:"💳", title:"Payment Tips", body:"Most stores in Korea accept credit/debit cards.\nHowever, some small shops, markets, or transportation top-up machines may require cash.\nKeep a small amount of KRW cash with you." },
        { icon:"🔌", title:"Power Plug Guide", body:"Korea uses Type C / Type F plugs.\nVoltage is 220V.\nIf your plug is different, buy an adapter at an airport shop or convenience store." },
        { icon:"💡", title:"Data Saving Tips", body:"To save mobile data:", list:["Use Wi-Fi for video","Turn off auto-play videos","Lower YouTube video quality","Download maps in advance","Turn off background data for unused apps"] },
        { icon:"🚨", title:"Emergency Numbers", emergency:[{ label:"Police", number:"112" },{ label:"Fire / Ambulance", number:"119" },{ label:"Tourist Information", number:"1330" },{ label:"KSIM Support", number:"Contact us from this page" }] },
      ]},
    },
    pwa:{ title:"Add KSIM Support to your home screen.", desc:"Quickly access SIM setup, troubleshooting, airport arrival guide, and support contact.", button:"Add to Home Screen", dismiss:"Later" },
    footer:{ company:"Company", email:"Email", hours:"Support Hours" },
  },
  zh: {
    langLabel:"中文",
    hero:{ sub:"您的SIM卡遇到问题了吗？", desc:"请选择您的语言，然后按照设置指南操作。" },
    menu:{ start:"使用指南", iphone:"iPhone设置", android:"Android设置", notWorking:"SIM卡无法使用", contact:"联系客服", channel:"机场入境指南" },
    startGuide:{ title:"使用指南", steps:["⚠️ 重要提示：如果您的手机上已激活其他SIM卡或eSIM（本国运营商、航空公司或漫游套餐），请在使用KSIM之前关闭其数据。同时激活两个数据连接会导致网速极慢或连接失败。","使用SIM卡包装内附的取卡针打开SIM卡托。将KSIM SIM卡放入卡托并轻轻推入手机。","完全关闭手机后重新开机。这有助于手机识别新的SIM卡。","进入设置，打开移动数据（也称为蜂窝数据）。请确认已切换为开启状态。","进入设置 > 移动数据 > 移动数据选项，开启数据漫游。在韩国使用数据时必须开启此选项。","进入设置 > 移动数据 > 网络选择，设置为自动。手机将自动搜索最佳可用网络。","重启后等待1至3分钟。顶部状态栏应显示网络名称。请尝试打开网页确认连接。","如果5分钟后仍无法使用数据，请尝试开启飞行模式10秒后再关闭。如果问题仍未解决，请联系KSIM客服。"] },
    iphone:{ title:"iPhone设置", steps:["进入设置（主屏幕上的齿轮图标）。","点击蜂窝网络（或移动数据，根据地区不同显示可能不同）。","⚠️ 如果您已激活本国eSIM或其他SIM卡，请点击该SIM卡并关闭其数据或停用该线路。进入设置 > 蜂窝网络 > 蜂窝数据，确认只有KSIM被选为数据线路。同时使用两个数据线路会导致网速极慢或连接失败。","确认蜂窝数据已开启（绿色开关）。","点击蜂窝数据选项（或移动数据选项）。","开启数据漫游。可能会出现提示框，点击确定。","返回上一页，点击网络选择。","关闭自动选项，等待5秒后重新开启。iPhone将搜索可用网络。","返回主屏幕，长按侧边按钮重启iPhone。重启后等待1-3分钟，检查数据是否正常。","如果顶部显示无服务或SOS，请尝试开关飞行模式。如果问题仍未解决，请联系KSIM客服。"] },
    android:{ title:"Android设置", steps:["进入设置（应用抽屉或通知栏中的齿轮图标）。","点击连接（三星手机）或网络与互联网（其他Android手机）。","⚠️ 如果您有双SIM卡或已注册eSIM，请点击SIM卡管理器（或SIM卡与网络），将KSIM设置为首选数据SIM卡，并关闭其他SIM卡或eSIM的数据。同时使用两个数据连接会导致网速极慢或连接失败。","点击移动网络（或SIM卡与移动网络）。","确认移动数据已开启。","开启数据漫游。KSIM SIM卡在韩国使用时必须开启此选项。","点击网络模式，选择自动连接或LTE/3G/2G（自动）。","点击网络运营商（或自动选择网络），设置为自动。","重启手机，等待1-3分钟等待网络连接。","如果数据仍无法使用，可能需要手动设置APN。请联系KSIM客服获取正确的APN设置。"] },
    notWorking:{
      title:"SIM卡无法使用",
      issues:{
        notDetected:{ label:"SIM卡未被检测", steps:["检查SIM卡之前请先完全关闭手机。","使用取卡针取出SIM卡托，取出SIM卡，检查是否有灰尘或损坏。","重新将SIM卡放入卡托，确保安装正确。将卡托重新推入手机。","开机后等待手机完全启动，检查SIM卡是否被识别。","如果手机有两个SIM卡槽，请尝试将KSIM SIM卡插入另一个卡槽。","如有可能，将KSIM SIM卡插入另一部手机测试卡是否正常工作。","如果SIM卡仍未被识别，可能是卡片损坏或不兼容。请联系KSIM客服并附上SIM卡和手机型号的照片。"] },
        noSignal:{ label:"无信号 / 仅限SOS", steps:["查看屏幕顶部。如果显示无服务或仅限SOS，说明手机未连接到网络。","开启飞行模式，等待10秒后关闭。这将重置网络连接。","进入设置 > 移动网络 > 网络选择，确认设置为自动。","完全重启手机，开机后等待2-3分钟。","移动到其他位置。部分室内或地下场所信号较弱。","确认数据漫游已开启。没有漫游，KSIM SIM卡在韩国无法连接。","如果尝试所有步骤后仍无信号，请联系KSIM客服并告知手机型号和当前位置。"] },
        dataNotWorking:{ label:"数据无法使用 / 网速极慢", steps:["确认移动数据（蜂窝数据）在设置中已开启。","确认数据漫游已开启。这是数据无法使用最常见的原因。","⚠️ 如果您的本国eSIM或其他SIM卡与KSIM同时处于激活状态，这很可能是导致网速极慢或连接失败的原因。请进入设置 > 蜂窝网络（iPhone）或SIM卡管理器（Android），确认只有KSIM被设置为活跃数据线路，并关闭所有其他SIM卡或eSIM的数据。","尝试开启飞行模式10秒后关闭，这将重置网络连接。","重启手机，等待2-3分钟让网络重新连接。","打开浏览器，尝试访问google.com测试连接。","如果数据仍无法使用，可能需要手动设置APN。请联系KSIM客服获取正确的APN设置。","iPhone用户：进入设置 > 蜂窝网络 > 蜂窝数据网络。Android用户：进入设置 > 移动网络 > 接入点名称（APN）。"] },
        esim:{ label:"eSIM未激活", steps:["首先确认您的手机支持eSIM。拨号界面输入*#06#，如果显示EID号码，说明支持eSIM。","扫描eSIM二维码前，请确保已连接Wi-Fi。eSIM激活需要网络连接。","使用手机摄像头扫描KSIM提供的二维码。iPhone：设置 > 蜂窝网络 > 添加eSIM。Android：设置 > 网络 > SIM卡 > 添加eSIM。","按照屏幕提示完成安装。安装过程中请勿关闭屏幕。","安装完成后重启手机。进入设置确认KSIM eSIM已设置为活跃数据线路。","为KSIM eSIM配置文件开启数据漫游。在韩国使用数据时必须开启此选项。","如果激活失败或二维码无效，请立即联系KSIM客服。请勿扫描二维码超过3次，否则可能失效。"] },
        refund:{ label:"退款 / 换货", steps:["请尽快联系KSIM客服，并附上SIM卡包装（正面和背面）的清晰照片。","告知购买地点、购买日期以及遇到的问题。","同时提供手机型号以及SIM卡是否曾插入手机。","已激活或使用过的SIM卡可能无法退款或更换。","如果问题是由不支持的手机（如运营商锁定设备或不兼容机型）引起，可能无法退款。","我们的客服团队将在24小时内处理您的案例并回复。"] },
      }
    },
    contact:{
      title:"联系客服",
      prepare:"联系客服前，请准备手机型号、SIM卡号码、购买地点和手机截图。",
      channels:{ whatsapp:"WhatsApp" },
      form:{ title:"提交支持请求", name:"姓名", phoneModel:"手机型号", simNumber:"SIM卡号码 / ICCID", purchaseLoc:"购买地点", issueType:"问题类型", issueOptions:["SIM卡未被检测","无信号","数据无法使用","eSIM未激活","退款 / 换货","其他"], screenshot:"上传截图", message:"留言", submit:"提交支持请求", success:"感谢您的联系。我们的支持团队将尽快与您联系。" },
    },
    channel:{
      title:"机场入境指南",
      intro:"抵达韩国后马上需要的信息。",
      channelCtaTitle:"关注 KSIM 频道",
      channelCtaDesc:"关注频道，获取SIM卡设置帮助、机场入境实用信息、特别优惠和长期居住套餐信息。",
      buttons:{ whatsapp:"关注 WhatsApp 频道", wechat:"添加微信", kakao:"添加 KakaoTalk 频道" },
      disclaimer:"关注频道后，您可能会收到KSIM的通知和促销信息。您可以随时取消关注。",
      arrival:{ title:"机场入境指南", cards:[
        { icon:"📶", title:"首先设置SIM卡", body:"在机场购买KSIM后，请插入SIM卡并重启手机。\n打开移动数据和数据漫游。\n将网络选择设置为自动，并等待1-3分钟。" },
        { icon:"📡", title:"机场Wi-Fi", body:"如果SIM卡尚未连接，请先使用机场Wi-Fi。\n然后打开KSIM Support，查看设置指南或联系客服。" },
        { icon:"✅", title:"离开机场前确认", list:["确认SIM卡是否连接","如有需要，请连接机场Wi-Fi","下载常用应用","购买或充值T-money交通卡","保存酒店地址","保存KSIM客服联系方式"] },
        { icon:"🚇", title:"交通 / T-money", body:"从机场可以乘坐机场铁路、机场巴士、地铁或出租车。",
          tmoney:{
            t1:{ label:"第1航站楼 (T1)", items:["1楼到达层 Exit 5、Exit 11 或 Exit 13 附近的 CU 便利店","B1 交通中心 / 机场铁路 AREX 入口附近"] },
            t2:{ label:"第2航站楼 (T2)", items:["1楼 Arrival Hall A 附近的 GS25","1楼 Exit 10 附近的 CU","B1 交通中心中央的 CU"] },
            topup:{ label:"充值地点", items:["便利店","地铁站充值机","机场铁路 AREX 附近"] },
            use:{ label:"使用地点", items:["地铁","巴士","便利店","部分出租车"] },
          },
          tip:"各便利店库存可能不同。如果一个店没有T-money卡，请前往其他便利店或机场铁路 AREX 附近确认。" },
        { icon:"🚕", title:"出租车应用 / 支付", body:"", taxiApps:[{ name:"Kakao T", desc:"韩国最常用的出租车应用。\n您可能可以使用海外手机号注册 Kakao T。\n如果没有韩国银行卡，请选择向司机付款。\n通常可以使用现金、信用卡或 T-money 支付。" },{ name:"k.ride", desc:"Kakao Mobility 面向外国用户推出的出租车应用。\n支持 Google/Apple 登录和海外银行卡支付。\n适合希望使用海外银行卡进行应用内支付的旅客。" },{ name:"Uber", desc:"在韩国也可以使用 Uber 应用叫本地出租车。\n如果您已经有 Uber 账号，使用起来会比较方便。\n但在韩国，通常更推荐 Kakao T 或 k.ride。" }], tip:"建议在机场 Wi-Fi 环境下下载出租车应用。" },
        { icon:"📱", title:"必备应用", body:"", useMustHaveApps:true, tip:"建议在机场Wi-Fi环境下下载应用。" },
        { icon:"💳", title:"支付提示", body:"韩国大多数商店支持信用卡/借记卡支付。\n但部分小店、市场或交通卡充值机可能需要现金。\n建议准备少量韩币现金。" },
        { icon:"🔌", title:"插头和电压指南", body:"韩国使用 C型 / F型 插头。\n电压为220V。\n如果插头不同，请在机场商店或便利店购买转换插头。" },
        { icon:"💡", title:"流量节省技巧", body:"节省流量的方法：", list:["视频观看时尽量使用Wi-Fi","关闭视频自动播放","降低YouTube画质","提前下载地图","关闭不常用应用的后台数据"] },
        { icon:"🚨", title:"紧急联系电话", emergency:[{ label:"报警", number:"112" },{ label:"火灾 / 急救", number:"119" },{ label:"旅游咨询", number:"1330" },{ label:"KSIM客服", number:"可通过本页面联系" }] },
      ]},
    },
    pwa:{ title:"将 KSIM Support 添加到主屏幕。", desc:"快速查看SIM卡设置、问题解决、机场入境指南和联系客服。", button:"添加到主屏幕", dismiss:"稍后" },
    footer:{ company:"公司", email:"邮箱", hours:"服务时间" },
  },
  ko: {
    langLabel:"한국어",
    hero:{ sub:"유심 사용에 문제가 있으신가요?", desc:"언어를 선택하고 설정 가이드를 따라주세요." },
    menu:{ start:"시작 가이드", iphone:"아이폰 설정", android:"안드로이드 설정", notWorking:"유심 불량/오류", contact:"고객센터 연결", channel:"공항 도착 가이드" },
    startGuide:{ title:"시작 가이드", steps:["⚠️ 주의: 본국 유심, eSIM, 항공사 eSIM, 로밍 eSIM 등 다른 데이터 회선이 활성화되어 있다면 반드시 해당 데이터를 끄거나 비활성화한 후 KSIM을 사용해주세요. 두 개의 데이터 회선이 동시에 활성화되면 속도가 매우 느려지거나 연결이 안 될 수 있습니다.","유심 패키지 안에 들어있는 핀으로 유심 트레이를 꺼내주세요. KSIM 유심을 트레이에 넣고 부드럽게 밀어 넣어주세요.","휴대폰을 완전히 종료한 후 다시 켜주세요. 새 유심을 인식하려면 재부팅이 필요합니다.","설정에서 모바일 데이터(또는 셀룰러 데이터)를 켜주세요. 반드시 켜져 있는 상태여야 합니다.","설정 > 모바일 데이터 > 데이터 로밍을 켜주세요. 한국에서 데이터를 사용하려면 반드시 로밍을 활성화해야 합니다.","설정 > 모바일 데이터 > 네트워크 선택에서 자동으로 설정해주세요. 휴대폰이 최적의 네트워크를 자동으로 찾습니다.","재부팅 후 1~3분 정도 기다려주세요. 상단 바에 통신사 이름이 표시되면 연결된 것입니다. 웹페이지를 열어 연결을 확인해보세요.","5분이 지나도 데이터가 안 된다면 비행기 모드를 10초 켰다가 끄고 다시 기다려주세요. 그래도 안 되면 KSIM 고객센터로 문의해주세요."] },
    iphone:{ title:"아이폰 설정", steps:["설정(홈 화면의 톱니바퀴 아이콘)을 열어주세요.","셀룰러(또는 모바일 데이터)를 탭해주세요.","⚠️ 본국 eSIM이나 다른 유심이 활성화되어 있다면 해당 회선을 탭해서 데이터를 끄거나 회선을 비활성화해주세요. 설정 > 셀룰러 > 셀룰러 데이터에서 KSIM만 선택되어 있는지 확인해주세요. 두 개의 데이터 회선이 동시에 켜져 있으면 속도가 매우 느려집니다.","셀룰러 데이터가 켜져 있는지 확인해주세요(초록색 토글).","셀룰러 데이터 옵션을 탭해주세요.","데이터 로밍을 켜주세요. 경고 팝업이 뜨면 확인을 눌러주세요.","뒤로 가서 네트워크 선택을 탭해주세요.","자동 토글을 끄고 5초 기다렸다가 다시 켜주세요. 아이폰이 사용 가능한 네트워크를 검색합니다.","홈 화면으로 돌아가서 전원 버튼을 길게 눌러 아이폰을 재부팅해주세요. 재부팅 후 1~3분 기다리며 데이터가 되는지 확인해주세요.","상단에 서비스 없음 또는 SOS만 표시된다면 비행기 모드를 켰다가 꺼주세요. 그래도 안 되면 KSIM 고객센터로 문의해주세요."] },
    android:{ title:"안드로이드 설정", steps:["설정(앱 서랍 또는 알림창의 톱니바퀴 아이콘)을 열어주세요.","연결(삼성) 또는 네트워크 및 인터넷(기타 안드로이드)을 탭해주세요.","⚠️ 듀얼 유심이나 eSIM이 등록되어 있다면 SIM 카드 관리자(또는 SIM 및 네트워크)를 탭해주세요. KSIM을 기본 데이터 SIM으로 설정하고 다른 유심이나 eSIM의 데이터를 꺼주세요. 두 개의 데이터가 동시에 켜져 있으면 속도가 극도로 느려집니다.","모바일 네트워크(또는 SIM 카드 및 모바일 네트워크)를 탭해주세요.","모바일 데이터가 켜져 있는지 확인해주세요.","데이터 로밍을 켜주세요. KSIM 유심이 한국에서 작동하려면 반드시 필요합니다.","네트워크 모드를 탭하고 자동 연결 또는 LTE/3G/2G(자동)을 선택해주세요.","네트워크 통신사(또는 네트워크 자동 선택)를 자동으로 설정해주세요.","휴대폰을 재부팅하고 1~3분 기다려 네트워크가 연결되는지 확인해주세요.","데이터가 안 된다면 APN 설정이 필요할 수 있습니다. KSIM 고객센터로 문의하면 APN 정보를 안내해드립니다."] },
    notWorking:{
      title:"유심 불량/오류",
      issues:{
        notDetected:{ label:"유심 인식 안 됨", steps:["유심 확인 전 휴대폰을 완전히 꺼주세요.","핀으로 유심 트레이를 꺼내고 유심을 분리한 후 먼지나 손상이 있는지 확인해주세요.","유심을 트레이에 다시 정확히 끼우고 트레이를 단단히 밀어 넣어주세요.","휴대폰을 켜고 완전히 부팅될 때까지 기다린 후 유심이 인식되는지 확인해주세요.","듀얼 유심 폰이라면 KSIM 유심을 다른 슬롯에 넣어보세요.","가능하다면 다른 휴대폰에 KSIM 유심을 넣어 유심 자체가 정상인지 확인해주세요.","유심이 여전히 인식되지 않는다면 카드가 손상되었거나 호환되지 않는 것일 수 있습니다. KSIM 고객센터에 유심 사진과 휴대폰 기종을 함께 보내주세요."] },
        noSignal:{ label:"신호 없음 / SOS만 표시", steps:["화면 상단을 확인해주세요. 서비스 없음 또는 SOS만 표시된다면 네트워크에 연결되지 않은 상태입니다.","비행기 모드를 10초 켰다가 끄세요. 네트워크 연결이 초기화됩니다.","설정 > 모바일 네트워크 > 네트워크 선택이 자동으로 되어 있는지 확인해주세요.","휴대폰을 완전히 재부팅하고 2~3분 기다려주세요.","다른 장소로 이동해보세요. 실내나 지하에서는 신호가 약할 수 있습니다.","데이터 로밍이 켜져 있는지 확인해주세요. 로밍 없이는 KSIM 유심이 작동하지 않습니다.","모든 단계를 시도해도 신호가 없다면 휴대폰 기종과 현재 위치를 알려주시고 KSIM 고객센터로 문의해주세요."] },
        dataNotWorking:{ label:"데이터 안 됨 / 속도 매우 느림", steps:["설정에서 모바일 데이터(셀룰러 데이터)가 켜져 있는지 확인해주세요.","데이터 로밍이 켜져 있는지 확인해주세요. 데이터가 안 되는 가장 흔한 원인입니다.","⚠️ 본국 eSIM이나 다른 유심이 KSIM과 동시에 활성화되어 있다면 속도가 매우 느려지거나 연결이 안 될 수 있습니다. 설정 > 셀룰러(아이폰) 또는 SIM 카드 관리자(안드로이드)에서 KSIM만 데이터 회선으로 설정되어 있는지 확인하고 다른 모든 유심 및 eSIM의 데이터를 꺼주세요.","비행기 모드를 10초 켰다가 끄세요. 네트워크가 초기화됩니다.","휴대폰을 재부팅하고 2~3분 기다려주세요.","브라우저를 열고 google.com 등 간단한 사이트에 접속해 연결을 확인해보세요.","데이터가 여전히 안 된다면 APN 설정이 필요할 수 있습니다. KSIM 고객센터에 문의하면 APN 정보를 안내해드립니다.","아이폰: 설정 > 셀룰러 > 셀룰러 데이터 네트워크에서 APN 항목을 확인해주세요. 안드로이드: 설정 > 모바일 네트워크 > 액세스 포인트 이름(APN)에서 확인해주세요."] },
        esim:{ label:"eSIM 개통 실패", steps:["먼저 휴대폰이 eSIM을 지원하는지 확인해주세요. 다이얼 화면에서 *#06#을 입력해 EID 번호가 표시되면 eSIM을 지원합니다.","eSIM QR코드를 스캔하기 전에 Wi-Fi에 연결해주세요. eSIM 개통에는 인터넷 연결이 필요합니다.","휴대폰 카메라로 KSIM이 제공한 QR코드를 스캔해주세요. 아이폰: 설정 > 셀룰러 > eSIM 추가. 안드로이드: 설정 > 네트워크 > SIM > eSIM 추가.","화면 안내에 따라 설치를 완료해주세요. 설치 중에는 화면을 닫지 마세요.","설치 후 휴대폰을 재부팅해주세요. 설정에서 KSIM eSIM이 활성 데이터 회선으로 설정되어 있는지 확인해주세요.","KSIM eSIM 프로파일의 데이터 로밍을 켜주세요. 한국에서 데이터를 사용하려면 반드시 필요합니다.","개통에 실패하거나 QR코드가 작동하지 않으면 즉시 KSIM 고객센터에 문의해주세요. QR코드는 3회 이상 스캔하면 무효화될 수 있습니다."] },
        refund:{ label:"환불 / 교체", steps:["가능한 빨리 KSIM 고객센터에 유심 패키지 앞면과 뒷면 사진을 찍어 보내주세요.","구매 장소, 구매일, 발생한 문제를 알려주세요.","휴대폰 기종과 유심을 폰에 넣어봤는지 여부도 알려주세요.","이미 개통되거나 사용된 유심은 환불 또는 교체가 제한될 수 있습니다.","지원 불가 기기(예: 잠금폰, 호환되지 않는 기종) 문제인 경우 환불이 어려울 수 있습니다.","고객센터에서 24시간 이내에 확인 후 답변 드립니다."] },
      }
    },
    contact:{
      title:"고객센터 연결",
      prepare:"문의 전 휴대폰 기종, 유심번호, 구매 장소, 화면 캡처를 준비해주세요.",
      channels:{ whatsapp:"WhatsApp" },
      form:{ title:"문의 접수", name:"이름", phoneModel:"휴대폰 기종", simNumber:"유심 번호 / ICCID", purchaseLoc:"구매 장소", issueType:"문의 유형", issueOptions:["유심 인식 안 됨","신호 없음","데이터 안 됨","eSIM 개통 실패","환불 / 교체","기타"], screenshot:"화면 캡처 첨부", message:"문의 내용", submit:"문의 접수하기", success:"문의가 접수되었습니다. 담당자가 곧 연락드릴 예정입니다." },
    },
    channel:{
      title:"공항 도착 가이드",
      intro:"한국 도착 후 바로 필요한 정보를 확인하세요.",
      channelCtaTitle:"KSIM 채널 추가하고 혜택 받기",
      channelCtaDesc:"채널을 추가하면 유심 설정 도움, 공항 도착 정보, 특별 혜택, 장기체류 요금제 안내를 받을 수 있습니다.",
      buttons:{ whatsapp:"WhatsApp 채널 추가", wechat:"WeChat 추가", kakao:"KakaoTalk 채널 추가" },
      disclaimer:"채널을 추가하면 KSIM 안내 및 프로모션 정보를 받을 수 있으며, 언제든지 취소할 수 있습니다.",
      arrival:{ title:"공항 도착 가이드", cards:[
        { icon:"📶", title:"유심 설정 먼저", body:"공항에서 KSIM을 구매한 후 유심을 넣고 휴대폰을 재부팅해주세요.\n모바일 데이터와 데이터 로밍을 켜주세요.\n네트워크 선택을 자동으로 설정하고 1~3분 정도 기다려주세요." },
        { icon:"📡", title:"공항 Wi-Fi", body:"유심이 아직 연결되지 않는다면 먼저 공항 Wi-Fi를 사용하세요.\n그다음 KSIM Support에서 설정 안내를 확인하거나 고객센터로 문의하세요." },
        { icon:"✅", title:"공항을 떠나기 전 확인사항", list:["유심 연결 확인","필요 시 공항 Wi-Fi 연결","필수 앱 다운로드","티머니 구매 또는 충전","숙소 주소 저장","KSIM 고객센터 저장"] },
        { icon:"🚇", title:"교통 / 티머니", body:"공항에서는 공항철도, 공항버스, 지하철, 택시를 이용할 수 있습니다.",
          tmoney:{
            t1:{ label:"제1터미널 (T1)", items:["1층 입국장 Exit 5, Exit 11, Exit 13 근처 CU 편의점","B1 교통센터 / 공항철도 AREX 입구 근처"] },
            t2:{ label:"제2터미널 (T2)", items:["1층 Arrival Hall A 근처 GS25","1층 Exit 10 근처 CU","B1 교통센터 중앙 CU"] },
            topup:{ label:"충전 장소", items:["편의점","지하철역 충전기","공항철도 AREX 근처"] },
            use:{ label:"사용처", items:["지하철","버스","편의점","일부 택시"] },
          },
          tip:"매장별 재고가 다를 수 있습니다. 한 곳에 티머니 카드가 없으면 다른 편의점이나 공항철도 AREX 근처를 확인하세요." },
        { icon:"🚕", title:"택시 앱 / 결제", body:"", taxiApps:[{ name:"Kakao T", desc:"한국에서 가장 많이 사용되는 택시 앱입니다.\n해외번호로 Kakao T를 이용할 수 있는 경우가 있습니다.\n한국 카드가 없다면 기사님께 직접 결제를 선택하세요.\n보통 현금, 신용카드, 티머니로 결제할 수 있습니다." },{ name:"k.ride", desc:"Kakao Mobility의 외국인 친화 택시 앱입니다.\nGoogle/Apple 로그인과 해외카드 결제를 지원합니다.\n해외카드로 앱 결제를 원하는 여행객에게 편리합니다." },{ name:"Uber", desc:"한국에서도 Uber 앱으로 현지 택시를 호출할 수 있습니다.\n이미 Uber 계정이 있는 외국인에게는 편할 수 있습니다.\n다만 한국에서는 Kakao T 또는 k.ride를 더 많이 안내합니다." }], tip:"공항 Wi-Fi에 연결된 상태에서 택시 앱을 다운로드하세요." },
        { icon:"📱", title:"한국 필수 앱", body:"", useMustHaveApps:true, tip:"공항 Wi-Fi에 연결된 상태에서 앱을 다운로드하세요." },
        { icon:"💳", title:"결제 팁", body:"한국은 대부분 카드 결제가 가능합니다.\n다만 일부 작은 가게, 시장, 교통카드 충전기에서는 현금이 필요할 수 있습니다.\n소액의 원화 현금을 준비해두면 좋습니다." },
        { icon:"🔌", title:"충전기 / 콘센트 안내", body:"한국은 C타입 / F타입 플러그를 사용합니다.\n전압은 220V입니다.\n플러그 모양이 다르면 공항 매장이나 편의점에서 어댑터를 구매하세요." },
        { icon:"💡", title:"데이터 절약 팁", body:"데이터 절약 방법:", list:["영상 시청은 Wi-Fi 사용","영상 자동재생 끄기","유튜브 화질 낮추기","지도 미리 다운로드","사용하지 않는 앱의 백그라운드 데이터 끄기"] },
        { icon:"🚨", title:"긴급 연락처", emergency:[{ label:"경찰", number:"112" },{ label:"화재 / 응급차", number:"119" },{ label:"관광안내", number:"1330" },{ label:"KSIM 고객센터", number:"이 페이지에서 문의" }] },
      ]},
    },
    pwa:{ title:"KSIM Support를 홈 화면에 추가하세요.", desc:"유심 설정, 문제 해결, 공항 도착 가이드, 고객센터 연결을 빠르게 확인할 수 있습니다.", button:"홈 화면에 추가", dismiss:"나중에" },
    footer:{ company:"회사", email:"이메일", hours:"운영시간" },
  },
  ja: {
    langLabel:"日本語",
    hero:{ sub:"SIMカードでお困りですか？", desc:"言語を選択して、設定ガイドに従ってください。" },
    menu:{ start:"スタートガイド", iphone:"iPhone設定", android:"Android設定", notWorking:"SIMカード不具合", contact:"サポートに連絡", channel:"空港到着ガイド" },
    startGuide:{ title:"スタートガイド", steps:["⚠️ 重要：母国のSIMカード、eSIM、航空会社のeSIM、ローミングeSIMなど、他のデータ回線がすでにアクティブになっている場合は、KSIMを使用する前に必ずそのデータをオフにするか無効にしてください。2つのデータ接続が同時にアクティブになると、速度が非常に遅くなったり、接続が失敗する場合があります。","SIMパッケージ内のピンを使ってSIMトレイを取り出してください。KSIMのSIMカードをトレイに入れて、スマートフォンに戻してください。","スマートフォンを完全にシャットダウンしてから再起動してください。新しいSIMカードを認識するために必要です。","設定からモバイルデータ（または携帯電話データ）をオンにしてください。必ずオンの状態にしてください。","設定 > モバイルデータ > モバイルデータ通信のオプションからデータローミングをオンにしてください。韓国でデータを使用するために必須です。","設定 > モバイルデータ > ネットワーク選択で自動に設定してください。スマートフォンが最適なネットワークを自動的に検索します。","再起動後、1〜3分お待ちください。画面上部にネットワーク名が表示されれば接続完了です。ウェブページを開いて接続を確認してください。","5分経ってもデータが使えない場合は、機内モードを10秒オンにしてからオフにしてください。それでも解決しない場合は、KSIMサポートにお問い合わせください。"] },
    iphone:{ title:"iPhone設定", steps:["設定（ホーム画面の歯車アイコン）を開いてください。","モバイル通信（または携帯電話データ）をタップしてください。","⚠️ 母国のeSIMや別のSIMカードがアクティブな場合は、そのSIMをタップしてデータをオフにするか、回線を無効にしてください。設定 > モバイル通信 > 通信のオプションで、KSIMのみがデータ回線として選択されているか確認してください。2つのデータ回線を同時に使用すると速度が非常に遅くなります。","モバイルデータ通信がオンになっているか確認してください（緑色のトグル）。","通信のオプション（またはモバイルデータオプション）をタップしてください。","データローミングをオンにしてください。警告が表示された場合はOKをタップしてください。","戻ってネットワーク選択をタップしてください。","自動のトグルをオフにして5秒待ってから、再度オンにしてください。iPhoneが利用可能なネットワークを検索します。","ホーム画面に戻り、サイドボタンを長押ししてiPhoneを再起動してください。再起動後、1〜3分待ってデータが使えるか確認してください。","画面上部に圏外またはSOSのみと表示される場合は、機内モードをオン・オフしてください。それでも解決しない場合は、KSIMサポートにお問い合わせください。"] },
    android:{ title:"Android設定", steps:["設定（アプリドロワーまたは通知パネルの歯車アイコン）を開いてください。","接続（Samsung）またはネットワークとインターネット（その他のAndroid）をタップしてください。","⚠️ デュアルSIMまたはeSIMが登録されている場合は、SIMカードマネージャー（またはSIMとネットワーク）をタップしてください。KSIMを優先データSIMに設定し、他のSIMカードやeSIMのデータをオフにしてください。2つのデータ接続を同時に使用すると速度が極端に遅くなります。","モバイルネットワーク（またはSIMカードとモバイルネットワーク）をタップしてください。","モバイルデータがオンになっているか確認してください。","データローミングをオンにしてください。韓国でKSIM SIMカードを使用するために必須です。","ネットワークモードをタップして、自動接続またはLTE/3G/2G（自動）を選択してください。","ネットワーク事業者（またはネットワークを自動選択）を自動に設定してください。","スマートフォンを再起動して、1〜3分待ってネットワークに接続されるか確認してください。","データが使えない場合は、APN設定が必要な場合があります。KSIMサポートにお問い合わせいただければ、正しいAPN設定をご案内します。"] },
    notWorking:{
      title:"SIMカード不具合",
      issues:{
        notDetected:{ label:"SIMカードが認識されない", steps:["SIMカードを確認する前に、スマートフォンを完全にシャットダウンしてください。","ピンを使ってSIMトレイを取り出し、SIMカードを取り外して、ほこりや損傷がないか確認してください。","SIMカードをトレイに正しく戻し、トレイをスマートフォンにしっかり押し込んでください。","スマートフォンを起動して完全に起動するまで待ち、SIMカードが認識されるか確認してください。","デュアルSIM対応スマートフォンの場合は、KSIM SIMカードを別のスロットに入れてみてください。","可能であれば、別のスマートフォンにKSIM SIMカードを入れてカード自体が正常か確認してください。","それでもSIMカードが認識されない場合は、カードが損傷しているか互換性がない可能性があります。SIMカードとスマートフォンの機種の写真を添えてKSIMサポートにお問い合わせください。"] },
        noSignal:{ label:"電波がない / SOSのみ表示", steps:["画面上部を確認してください。圏外またはSOSのみと表示される場合、ネットワークに接続されていない状態です。","機内モードをオンにして10秒待ってからオフにしてください。ネットワーク接続がリセットされます。","設定 > モバイルネットワーク > ネットワーク選択が自動になっているか確認してください。","スマートフォンを完全に再起動して、2〜3分お待ちください。","別の場所に移動してみてください。屋内や地下では電波が弱い場合があります。","データローミングがオンになっているか確認してください。ローミングなしではKSIM SIMカードが韓国で動作しません。","すべての手順を試しても電波がない場合は、スマートフォンの機種と現在の場所をお知らせの上、KSIMサポートにお問い合わせください。"] },
        dataNotWorking:{ label:"データ通信ができない / 速度が非常に遅い", steps:["設定でモバイルデータ（携帯電話データ）がオンになっているか確認してください。","データローミングがオンになっているか確認してください。データが使えない最も一般的な原因です。","⚠️ 母国のeSIMや別のSIMカードがKSIMと同時にアクティブになっている場合、速度が非常に遅くなったり接続が失敗する原因になります。設定 > モバイル通信（iPhone）またはSIMカードマネージャー（Android）で、KSIMのみがデータ回線として設定されているか確認し、他のすべてのSIMやeSIMのデータをオフにしてください。","機内モードを10秒オンにしてからオフにしてください。ネットワークがリセットされます。","スマートフォンを再起動して、2〜3分待ってネットワークに再接続してください。","ブラウザを開いてgoogle.comなどのシンプルなサイトにアクセスして接続を確認してください。","それでもデータが使えない場合は、APN設定が必要な場合があります。KSIMサポートにお問い合わせいただければ、正しいAPN設定をご案内します。","iPhoneユーザー：設定 > モバイル通信 > モバイルデータ通信ネットワーク。Androidユーザー：設定 > モバイルネットワーク > アクセスポイント名（APN）をご確認ください。"] },
        esim:{ label:"eSIMが開通できない", steps:["まず、スマートフォンがeSIMに対応しているか確認してください。ダイヤル画面で*#06#を入力して、EID番号が表示されればeSIM対応です。","eSIMのQRコードをスキャンする前に、Wi-Fiに接続してください。eSIMの開通にはインターネット接続が必要です。","スマートフォンのカメラでKSIMが提供したQRコードをスキャンしてください。iPhone：設定 > モバイル通信 > eSIMを追加。Android：設定 > ネットワーク > SIM > eSIMを追加。","画面の指示に従ってインストールを完了してください。インストール中は画面を閉じないでください。","インストール後、スマートフォンを再起動してください。設定でKSIM eSIMがアクティブなデータ回線として設定されているか確認してください。","KSIM eSIMプロファイルのデータローミングをオンにしてください。韓国でデータを使用するために必須です。","開通に失敗した場合やQRコードが機能しない場合は、すぐにKSIMサポートにお問い合わせください。QRコードを3回以上スキャンすると無効になる場合があります。"] },
        refund:{ label:"返金 / 交換", steps:["できるだけ早くKSIMサポートにSIMカードパッケージ（表面と裏面）の写真を添えてご連絡ください。","購入場所、購入日、発生している問題をお知らせください。","スマートフォンの機種と、SIMカードをスマートフォンに挿入したかどうかもお知らせください。","すでに開通または使用済みのSIMカードは、返金・交換が制限される場合があります。","対応していないスマートフォン（例：キャリアロック端末、互換性のない機種）が原因の場合、返金が難しい場合があります。","サポートチームが24時間以内に確認してご回答いたします。"] },
      }
    },
    contact:{
      title:"サポートに連絡",
      prepare:"お問い合わせ前に、スマートフォンの機種、SIM番号、購入場所、スクリーンショットをご準備ください。",
      channels:{ whatsapp:"WhatsApp" },
      form:{ title:"サポートリクエストを送信", name:"お名前", phoneModel:"スマートフォンの機種", simNumber:"SIM番号 / ICCID", purchaseLoc:"購入場所", issueType:"問題の種類", issueOptions:["SIMカードが認識されない","電波がない","データ通信ができない","eSIMが開通できない","返金 / 交換","その他"], screenshot:"スクリーンショットをアップロード", message:"メッセージ", submit:"サポートリクエストを送信", success:"ありがとうございます。サポートチームよりご連絡いたします。" },
    },
    channel:{
      title:"空港到着ガイド",
      intro:"韓国到着後すぐに必要な情報をご確認ください。",
      channelCtaTitle:"KSIMチャンネルをフォロー",
      channelCtaDesc:"チャンネルをフォローして、SIM設定サポート、空港到着情報、特別オファーをお受け取りください。",
      buttons:{ whatsapp:"WhatsAppチャンネルをフォロー", wechat:"WeChatを追加", kakao:"KakaoTalkチャンネルを追加" },
      disclaimer:"チャンネルをフォローすると、KSIMからの通知やプロモーション情報を受け取る場合があります。いつでもフォローを解除できます。",
      arrival:{ title:"空港到着ガイド", cards:[
        { icon:"📶", title:"まずSIMカードを設定", body:"空港でKSIMを購入後、SIMカードを挿入してスマートフォンを再起動してください。\nモバイルデータとデータローミングをオンにしてください。\nネットワーク選択を自動に設定して1〜3分お待ちください。" },
        { icon:"📡", title:"空港Wi-Fi", body:"SIMカードがまだ接続できない場合は、まず空港Wi-Fiをご利用ください。\nその後、KSIM Supportで設定ガイドを確認するか、サポートにお問い合わせください。" },
        { icon:"✅", title:"空港を出る前の確認事項", list:["SIM接続を確認","必要に応じて空港Wi-Fiに接続","必須アプリをダウンロード","Tマネーを購入またはチャージ","宿泊先の住所を保存","KSIMサポートの連絡先を保存"] },
        { icon:"🚇", title:"交通 / Tマネー", body:"空港からは空港鉄道、空港バス、地下鉄、タクシーをご利用いただけます。",
          tmoney:{
            t1:{ label:"第1ターミナル (T1)", items:["1階到着ロビー Exit 5、Exit 11、Exit 13 近くのCUコンビニ","B1交通センター / AREX入口近く"] },
            t2:{ label:"第2ターミナル (T2)", items:["1階 Arrival Hall A 近くのGS25","1階 Exit 10 近くのCU","B1交通センター中央のCU"] },
            topup:{ label:"チャージ場所", items:["コンビニ","地下鉄駅のチャージ機","AREX近く"] },
            use:{ label:"使用できる場所", items:["地下鉄","バス","コンビニ","一部のタクシー"] },
          },
          tip:"店舗によって在庫が異なる場合があります。一店舗にTマネーカードがなければ、他のコンビニやAREX周辺をご確認ください。" },
        { icon:"🚕", title:"タクシーアプリ / 支払い", body:"", taxiApps:[{ name:"Kakao T", desc:"韓国で最も広く使われているタクシーアプリです。\n海外の電話番号でKakao Tをご利用いただける場合があります。\n韓国のカードをお持ちでない場合は、運転手への直接支払いを選択してください。\n通常、現金、クレジットカード、またはTマネーでお支払いいただけます。" },{ name:"k.ride", desc:"Kakao Mobilityの外国人向けタクシーアプリです。\nGoogle/Appleログインと海外カード決済に対応しています。\n海外カードでアプリ内決済をご希望の旅行者に便利です。" },{ name:"Uber", desc:"韓国でもUberアプリで現地タクシーを呼ぶことができます。\nすでにUberアカウントをお持ちの方に便利です。\nただし韓国ではKakao TまたはK.rideを多く推奨しています。" }], tip:"空港Wi-Fiに接続した状態でタクシーアプリをダウンロードしてください。" },
        { icon:"📱", title:"必須アプリ", body:"", useMustHaveApps:true, tip:"空港Wi-Fiに接続した状態でアプリをダウンロードしてください。" },
        { icon:"💳", title:"お支払いのヒント", body:"韓国のほとんどの店舗でクレジット/デビットカードが使用できます。\nただし一部の小規模店舗、市場、交通系チャージ機では現金が必要な場合があります。\n少額の韓国ウォン現金をご準備ください。" },
        { icon:"🔌", title:"電源プラグガイド", body:"韓国ではCタイプ / Fタイプのプラグが使用されます。\n電圧は220Vです。\nプラグの形状が異なる場合は、空港のショップやコンビニでアダプターをご購入ください。" },
        { icon:"💡", title:"データ節約のヒント", body:"モバイルデータを節約するには：", list:["動画視聴にはWi-Fiを使用","動画の自動再生をオフ","YouTubeの動画品質を下げる","地図を事前にダウンロード","使用していないアプリのバックグラウンドデータをオフ"] },
        { icon:"🚨", title:"緊急連絡先", emergency:[{ label:"警察", number:"112" },{ label:"消防 / 救急", number:"119" },{ label:"観光案内", number:"1330" },{ label:"KSIMサポート", number:"このページからお問い合わせ" }] },
      ]},
    },
    pwa:{ title:"KSIM Supportをホーム画面に追加してください。", desc:"SIM設定、トラブルシューティング、空港到着ガイド、サポート連絡に素早くアクセスできます。", button:"ホーム画面に追加", dismiss:"後で" },
    footer:{ company:"会社", email:"メール", hours:"サポート時間" },
  },
};

const SvgSim = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 2v4h6V2"/><rect x="8" y="10" width="3" height="3" rx="0.5"/><rect x="13" y="10" width="3" height="3" rx="0.5"/><rect x="8" y="15" width="3" height="3" rx="0.5"/><rect x="13" y="15" width="3" height="3" rx="0.5"/></svg>;
const SvgCheck = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgLeft = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgRight = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgDown = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgUp = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgHeadset = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z"/></svg>;
const SvgWa = ({cls}: {cls: string}) => <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;

function Card({children, cls}: {children: any, cls?: string}) {
  return <div className={"bg-white rounded-2xl shadow-sm border border-gray-100 p-5 " + (cls||"")}>{children}</div>;
}
function CautionBox({text}: {text: string}) {
  return <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3"><p className="text-amber-800 text-sm leading-relaxed">{text}</p></div>;
}
function InfoBox({text}: {text: string}) {
  return <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4"><p className="text-blue-700 text-xs leading-relaxed">{text}</p></div>;
}
function SecHeader({title, onBack}: {title: string, onBack: () => void}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <button onClick={onBack} className="p-2 rounded-xl bg-gray-100 min-w-11 min-h-11 flex items-center justify-center">
        <SvgLeft cls="w-5 h-5 text-gray-600"/>
      </button>
      <h2 className="text-xl font-bold text-gray-900 leading-tight">{title}</h2>
    </div>
  );
}
function StepList({steps}: {steps: string[]}) {
  return (
    <ol className="space-y-4 mt-2">
      {steps.map(function(s,i) {
        return (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">{i+1}</span>
            <span className="text-gray-700 text-base leading-relaxed pt-1">{s}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default function KSIMSupport() {
  var langState = useState<string|null>(null);
  var lang = langState[0];
  var setLang = langState[1];

  var sectionState = useState(SEC.HOME);
  var section = sectionState[0];
  var setSection = sectionState[1];

  var subIssueState = useState<string|null>(null);
  var subIssue = subIssueState[0];
  var setSubIssue = subIssueState[1];

  var formStateHook = useState({ name:"", phoneModel:"", simNumber:"", purchaseLoc:"", issueType:"", screenshot:null as any, message:"" });
  var formState = formStateHook[0];
  var setFormState = formStateHook[1];

  var formDoneState = useState(false);
  var formDone = formDoneState[0];
  var setFormDone = formDoneState[1];

  var pwaBannerState = useState(false);
  var pwaBanner = pwaBannerState[0];
  var setPwaBanner = pwaBannerState[1];

  var contactRef = useRef<HTMLDivElement>(null);

  useEffect(function() {
    if (PWA_CONFIG.enabled) {
      var dismissed = sessionStorage.getItem("pwa_dismissed");
      if (!dismissed) setPwaBanner(true);
    }
  }, []);

  var t = lang ? C[lang] : null;

  function goHome() { setSection(SEC.HOME); setSubIssue(null); }
  function goContact() {
    setSection(SEC.CONTACT);
    setTimeout(function() {
      if (contactRef.current) contactRef.current.scrollIntoView({behavior:"smooth"});
    }, 100);
  }
  function dismissPwa() { sessionStorage.setItem("pwa_dismissed","1"); setPwaBanner(false); }

  return (
    <div className="min-h-screen font-sans">

      {!lang && (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center px-5 py-12">
          <div className="w-full max-w-sm text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-xl mb-5">
              <SvgSim cls="w-12 h-12 text-blue-600"/>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">KSIM Support</h1>
            <p className="text-blue-100 text-xl font-semibold mb-1">Having trouble with your SIM?</p>
            <p className="text-blue-200 text-base mb-10">Please choose your language and follow the setup guide.</p>
            <div className="space-y-3">
              {["en","zh","ko","ja"].map(function(code) {
                return (
                  <button key={code} onClick={function() { setLang(code); setSection(SEC.HOME); }} className="w-full py-5 rounded-2xl bg-white text-blue-700 font-bold text-xl shadow-md hover:bg-blue-50 active:scale-95 transition-all">
                    {C[code].langLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {lang && t && (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-xl mx-auto min-h-screen flex flex-col">

            {pwaBanner && (
              <div className="bg-indigo-600 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                      <SvgSim cls="w-5 h-5 text-indigo-600"/>
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold leading-snug">{t.pwa.title}</p>
                      <p className="text-indigo-200 text-xs leading-snug mt-0.5">{t.pwa.desc}</p>
                      <button onClick={dismissPwa} className="mt-2 bg-white text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-lg">{"📲 " + t.pwa.button}</button>
                    </div>
                  </div>
                  <button onClick={dismissPwa} className="text-indigo-200 hover:text-white text-lg flex-shrink-0">{"✕"}</button>
                </div>
              </div>
            )}

            <header className="sticky top-0 z-50 bg-blue-600 shadow-md">
              <div className="px-4 py-3 flex items-center justify-between">
                <button onClick={goHome} className="flex items-center gap-2 text-white font-bold text-lg">
                  <SvgSim cls="w-6 h-6"/><span>KSIM Support</span>
                </button>
                <div className="flex gap-1">
                  {["en","zh","ko","ja"].map(function(code) {
                    return (
                      <button key={code} onClick={function() { setLang(code); }} className={"px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors " + (lang===code ? "bg-white text-blue-600" : "text-blue-200 hover:text-white")}>
                        {C[code].langLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </header>

            <main className="flex-1 px-4 py-5 space-y-3">

              {section === SEC.HOME && (
                <div className="space-y-3">
                  <p className="text-center text-gray-500 text-base">{t.hero.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {key:SEC.START,       label:t.menu.start,      cls:"bg-blue-600 hover:bg-blue-700 text-white",  full:false},
                      {key:SEC.IPHONE,      label:t.menu.iphone,     cls:"bg-blue-600 hover:bg-blue-700 text-white",  full:false},
                      {key:SEC.ANDROID,     label:t.menu.android,    cls:"bg-blue-600 hover:bg-blue-700 text-white",  full:false},
                      {key:SEC.NOT_WORKING, label:t.menu.notWorking, cls:"bg-red-500 hover:bg-red-600 text-white",    full:false},
                      {key:SEC.CHANNEL,     label:t.menu.channel,    cls:"bg-sky-500 hover:bg-sky-600 text-white",    full:true},
                    ].map(function(item) {
                      return (
                        <button key={item.key} onClick={function() { setSection(item.key); setSubIssue(null); }} className={item.cls + " " + (item.full ? "col-span-2" : "") + " rounded-2xl px-4 py-5 flex items-center gap-3 shadow-sm active:scale-95 transition-all min-h-16 text-left"}>
                          <span className="text-base font-bold leading-tight">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {section === SEC.START && <Card><SecHeader title={t.startGuide.title} onBack={goHome}/><StepList steps={t.startGuide.steps}/></Card>}
              {section === SEC.IPHONE && <Card><SecHeader title={t.iphone.title} onBack={goHome}/><StepList steps={t.iphone.steps}/></Card>}
              {section === SEC.ANDROID && <Card><SecHeader title={t.android.title} onBack={goHome}/><StepList steps={t.android.steps}/></Card>}

              {section === SEC.NOT_WORKING && (
                <div className="space-y-4">
                  <Card>
                    <SecHeader title={t.notWorking.title} onBack={goHome}/>
                    {!subIssue ? (
                      <div className="space-y-3">
                        {Object.entries(t.notWorking.issues).map(function(entry) {
                          var key = entry[0];
                          var issue = entry[1] as any;
                          return (
                            <button key={key} onClick={function() { setSubIssue(key); }} className="w-full flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl px-4 py-4 text-left transition-colors min-h-14">
                              <span className="font-semibold text-gray-800">{issue.label}</span>
                              <SvgRight cls="w-5 h-5 text-gray-400"/>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <button onClick={function() { setSubIssue(null); }} className="mb-4 text-sm text-blue-600 font-medium flex items-center gap-1">
                          <SvgLeft cls="w-4 h-4"/>{(t.notWorking.issues as any)[subIssue].label}
                        </button>
                        <StepList steps={(t.notWorking.issues as any)[subIssue].steps}/>
                      </div>
                    )}
                  </Card>
                  {subIssue && (
                    <button onClick={goContact} className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-14">
                      <SvgHeadset cls="w-5 h-5"/>{t.menu.contact}
                    </button>
                  )}
                </div>
              )}

              {section === SEC.CONTACT && (
                <div ref={contactRef} className="space-y-4">
                  <Card>
                    <SecHeader title={t.contact.title} onBack={goHome}/>
                    <InfoBox text={t.contact.prepare}/>
                    <a href={SUPPORT_LINKS.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-green-500 text-white rounded-xl py-5 font-bold text-lg hover:bg-green-600 active:scale-95 transition-all min-h-20 w-full">
                      <SvgWa cls="w-7 h-7"/>{t.contact.channels.whatsapp}
                    </a>
                  </Card>
                  <Card>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{t.contact.form.title}</h3>
                    {formDone ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><SvgCheck cls="w-8 h-8 text-green-600"/></div>
                        <p className="text-green-700 font-semibold">{t.contact.form.success}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {[["name",t.contact.form.name],["phoneModel",t.contact.form.phoneModel],["simNumber",t.contact.form.simNumber],["purchaseLoc",t.contact.form.purchaseLoc]].map(function(pair) {
                          var key = pair[0];
                          var label = pair[1];
                          return (
                            <div key={key}>
                              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                              <input type="text" value={(formState as any)[key]} onChange={function(e) { setFormState(function(s) { var next = Object.assign({}, s); (next as any)[key] = e.target.value; return next; }); }} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 min-h-12"/>
                            </div>
                          );
                        })}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contact.form.issueType}</label>
                          <select value={formState.issueType} onChange={function(e) { setFormState(function(s) { return Object.assign({}, s, {issueType: e.target.value}); }); }} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 bg-white min-h-12">
                            <option value="">{"-"}</option>
                            {t.contact.form.issueOptions.map(function(opt) { return <option key={opt} value={opt}>{opt}</option>; })}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contact.form.screenshot}</label>
                          <input type="file" accept="image/*" onChange={function(e) { setFormState(function(s) { return Object.assign({}, s, {screenshot: e.target.files?.[0]}); }); }} className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold"/>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contact.form.message}</label>
                          <textarea rows={4} value={formState.message} onChange={function(e) { setFormState(function(s) { return Object.assign({}, s, {message: e.target.value}); }); }} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 resize-none"/>
                        </div>
                        <button onClick={function() { setFormDone(true); }} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 active:scale-95 transition-all min-h-14">{t.contact.form.submit}</button>
                      </div>
                    )}
                  </Card>
                  <Card cls="border border-blue-100 bg-blue-50">
                    <div className="flex items-center gap-2 mb-2"><span className="text-xl">{"📲"}</span><h3 className="text-lg font-bold text-gray-900">{t.channel.channelCtaTitle}</h3></div>
                    <p className="text-gray-600 text-sm mb-3">{t.channel.channelCtaDesc}</p>
                    <p className="text-xs text-gray-400 text-center">{t.channel.disclaimer}</p>
                  </Card>
                </div>
              )}

              {section === SEC.CHANNEL && (
                <div className="space-y-4">
                  <Card>
                    <SecHeader title={t.channel.title} onBack={goHome}/>
                    <p className="text-gray-600 text-sm">{t.channel.intro}</p>
                  </Card>
                  {t.channel.arrival.cards.map(function(card: any, i: number) {
                    return (
                      <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <p className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-base">
                          <span className="text-xl">{card.icon}</span>{card.title}
                        </p>
                        {card.body && <p className="text-sm text-gray-600 whitespace-pre-line mb-3">{card.body}</p>}
                        {card.tmoney && (
                          <div className="space-y-3 mt-2">
                            <div className="grid grid-cols-2 gap-2">
                              {[card.tmoney.t1, card.tmoney.t2].map(function(terminal: any, ti: number) {
                                return (
                                  <div key={ti} className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                                    <p className="text-xs font-bold text-blue-600 mb-2">{terminal.label}</p>
                                    <ul className="space-y-1">
                                      {terminal.items.map(function(item: string, k: number) {
                                        return <li key={k} className="text-xs text-gray-600 flex gap-1.5"><span className="text-blue-300 flex-shrink-0">{"•"}</span>{item}</li>;
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {[card.tmoney.topup, card.tmoney.use].map(function(sec: any, si: number) {
                                return (
                                  <div key={si} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                                    <p className="text-xs font-bold text-gray-600 mb-2">{sec.label}</p>
                                    <ul className="space-y-1">
                                      {sec.items.map(function(item: string, k: number) {
                                        return <li key={k} className="text-xs text-gray-600 flex gap-1.5"><span className="text-gray-300 flex-shrink-0">{"•"}</span>{item}</li>;
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {card.taxiApps && (
                          <div className="space-y-2 mt-2">
                            {card.taxiApps.map(function(app: any, j: number) {
                              return (
                                <div key={j} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                  <p className="text-sm font-bold text-gray-800 mb-1">{app.name}</p>
                                  <p className="text-xs text-gray-600 whitespace-pre-line">{app.desc}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {card.useMustHaveApps && (
                          <div className="space-y-2 mt-2">
                            {mustHaveApps.map(function(app, j) {
                              return (
                                <div key={j} className="bg-white border border-gray-100 rounded-2xl px-3 py-3 flex items-center gap-3 shadow-sm">
                                  <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                                    <img src={app.icon} alt={app.name} className="w-12 h-12 object-cover rounded-xl"
                                      onError={function(e: any) { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}/>
                                    <span className="text-2xl hidden">{"📱"}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 leading-tight">{app.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">{(app.description as any)[lang] || app.description.en}</p>
                                  </div>
                                  <div className="flex-shrink-0 text-gray-300 text-lg">{"↓"}</div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {card.list && (
                          <ul className="mt-2 space-y-1">
                            {card.list.map(function(item: string, k: number) {
                              return <li key={k} className="text-sm text-gray-600 flex gap-2"><span className="text-blue-400 mt-0.5">{"•"}</span>{item}</li>;
                            })}
                          </ul>
                        )}
                        {card.tip && <p className="mt-3 text-xs text-teal-700 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">{"💡 " + card.tip}</p>}
                        {card.emergency && (
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {card.emergency.map(function(item: any, j: number) {
                              return (
                                <div key={j} className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
                                  <p className="text-xs text-red-400 font-semibold mb-1">{item.label}</p>
                                  <p className="text-lg font-extrabold text-red-600">{item.number}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{"📲 " + t.channel.channelCtaTitle}</h3>
                    <p className="text-gray-600 text-sm mb-3">{t.channel.channelCtaDesc}</p>
                    <p className="text-xs text-gray-400 text-center">{t.channel.disclaimer}</p>
                  </div>
                </div>
              )}

            </main>

            {section !== SEC.CONTACT && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 shadow-2xl z-40">
                <button onClick={goContact} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 active:scale-95 transition-all min-h-14">
                  <SvgHeadset cls="w-6 h-6"/>{t.menu.contact}
                </button>
              </div>
            )}
            {section !== SEC.CONTACT && <div className="h-20"/>}

            <footer className="bg-gray-800 text-gray-400 text-sm px-5 py-8">
              <p className="text-gray-200 font-bold text-base mb-3">{FOOTER_INFO.brand}</p>
              <div className="space-y-2">
                <p><span className="text-gray-300 font-semibold">{t.footer.company + ":"}</span>{" " + FOOTER_INFO.company}</p>
                <p><span className="text-gray-300 font-semibold">{t.footer.email + ":"}</span>{" " + FOOTER_INFO.email}</p>
                <p><span className="text-gray-300 font-semibold">{t.footer.hours + ":"}</span>{" " + FOOTER_INFO.supportHours}</p>
                <p className="pt-3 text-xs text-gray-500">{"© " + new Date().getFullYear() + " " + FOOTER_INFO.brand + " · " + FOOTER_INFO.company + ". All rights reserved."}</p>
              </div>
            </footer>

          </div>
        </div>
      )}

    </div>
  );
}
