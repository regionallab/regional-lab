import { useState, useRef, useEffect } from "react";

const LOGO = "data:image/webp;base64,UklGRiQMAABXRUJQVlA4IBgMAADwOgCdASpUAYgAPp1MoEwlpCMiI1WakLATiWVu4XPw6tg3rvKa61nBPR+TE/L6LduRznem770D/ksle86bUPnJ+VSaiZvO5/V97vAIdd2hHfXzYZpv12yc76dQ/plkgEZo08UApp4oBTTxLWTlYP2oIBTTxQCmPyKSb2i17KEEiGkFgdXjQq7pOS46jWAZVdITnKiy8R9Fl32rZfVSuDHB8iHhV6j1rVTUHnmCXUu5jENX67LxWe5dQAM8JVfcYZr78r1dm8M5I5fuAbTzLkN74HHObOk7NmNz4Zd7qSzHKsMvRfwn3D7mB79A3OKgrgD2cqxAtsQwx6uAQqX2qTFC2TxeYxA96HCcU7Tv7ipElw41AQERyxP12WrdEoI87Ru+uYka3LgJSgGoXDokUkloPzXyYvPjGVasjWw+10okn83mmbqfHJtaF7I1SckzHngDZGgH9XJWTZEuWKzJGd3X0ukGzaUhSm5Y1qlhEQ1GAOcr0gpzldW5ttwt5RgZOWH7NEfs2OegVHeaIJnNd3cJxF6p57RSP7BAMdzNq2vh8zt2NRKeJgkwrDtxiic1cG60F5d1Nh8DIbZcn2utXzIq9l4o4PYGerj4Y2ItBgCWpABMO7LxIqDJiRUGTEioBAAA/v54g//Xn5f/SjFzDpFH6dclIAZIOu4LblJ0UmsO8rT7HK4LtH9A14KTVWm+QyGYumAYZqAEU3jE9cgaAGm1Ym8eFwbqMNqaWIEK8wAGgjbQp0Q9upBwIeaATwI8p/cQhHPm5BpEkift4unugdXeTWtdGnMgy8QAJMpopTX1PL7hp4oja9klsuI28QCeEq7Txxz0/GwPbWeOMJjpiLzhCarh9Nj3BliyE7E8RUhQv7I5M9xD4ejfiSkiycU/wC+QaVLkFE4E4FsgCH2/6oja3AoNJ57mDUPqxvp173lJ0PvrgFdQBlyGUEPZg9+YgCZJiBj3rdWKPoUPwByM8FYcmHTdv+MJoI7Nq/10WA+luR7wDO8mSiNIzK/peW7+0U65jOJN+MCG66Ws3nNgETBQyHIjbonY6n57zushGOydWSFqIQau0H++biLwMJ9MBAs9SGog3WOEOw9OcjtJ2cAtOFo7pE8M5udmB9nLNvrYhCVv2Wf+leapGbp5tiAaW0cqYt+50slGLnPPw15kioZrbu08inQzCItTinMmt1Ua7hAPtiKzNF9+7owKUiPwEENw7rpdW+0bFd0t+g1B5wjRgmykVbmg+BlyWG+g332/bN8PO2A3drNTHQ5o2cWNrMUOwmIV9uf9A7nS+mPikjZ7GdVfmwylNEjyYOAf/9CkrvPAzt9Hu92sMQ7eTpEWZRP0JlJT3RIZCEjZ9Hx+cETZ/S8u7jo2T3hJ+9uLgOWoF5dpYzA0SIZ/PuLeU0MKmTyK308sTqVMtvYgiMCaaW2+BTmW3eQZU64FmRZQlE6/i8OG3SW4WKDe2KOMcv1yTSTNjdsTRid8S7+Bre6zpH5ob766BU5Ml4w8WynqYIyPPdv0ur8jFexOn3tr+Y+1EXUgyJ5RJoJMEJmbCuIALGkPAD+/BETHn4TeiDpliDct+R/KoGi9dcYUflKs6sWPgXoqK8U3UplkvjQnT+poClEhmcRnhvuPFrPK6Gp2AaVsf3egwN/8/7l4SDYOgVBSR6btGLccKG8+BHfMnAxPvS+fnrbgZ6N+FO5IygIyTogzu5vS/guWk0oYJL9xd+Vw6CwjbqjWDM51Q3kMGELceeOl7cRIx5gd+6BOCVrofPFcFaNZIM4W2Otm2gqTGfRr2Q411JtvUeMVSoWSkrDOkp6YmwciXlnqZe8jm/hsX0sqr8GS0IYN9CmT5Z8zfvBELMKl5VEiwvuaPD3NSTDwk46yyFQAQaZtnPPMA5Nnjk30sOFJsHYtkB5bFBCd0iw8YkNGZEClIvWftbfl+A+V4/bKv831aDAtVgNQAHT5EDBC+k8xF3IgvzImDF5MU4OBjD4kKyVBsxat7m0NVeZNQBDtTrGjoQKp0q7dSVFH8Xn2w6ODaA5fn4nMPidU92orKrAYDTWJWVrDrDTSTfKjedU37qFcmZuZVBKqx2p6x6VyU/h1omBNsrA3HpZI6dDiphRyCCd0sf+Yy/kWi2c6RPUIvBzVQ/axX5iZTjYPrGS/UU50CqOMenT0iAvn6+IXgF9m7tKsOmsHE4Myo4YUEuM1i6oF51BYyucwn0m+N2/3DmVkkj/a4ICpFmYj4xPIxi/D8lfsjdc2GiZnktcZTOgFJKPEqR0NiT4yMwvKID/dpP7ycLVOMjvXjbebHMG6jAwQJN0KIsBlajbBbwssAG57kufDeaWLKGqnvJ4T5kmthdX4g3RVgTk+U6Ln9sSBHq4Nt9SdtFY+8QY9AB2QB0OtJk/ASVTbrDt6ml+HfSX/+OAxYo8z+AS7YKcNVEsSOM14VTXNcc5ep4gOzy1bQIOnWsqhmkD1SQF6V//rtVAzfZQs4ycW5pwmNm1fh4AeztBzD9dEwZQoDOyJztQbyz3PUpBzGlApg8XIgsqxknY/XVwmI6pEyjb2g/nvCushm5UppIFMzuN/XiZadDZD2gW8oWiWfaf2p+RWZ2ucCwlU9FGyI4kfMv3CxFpVIJxqfvxRSYydThl8bVQqASSug+ibxB+Ds/SIKXT24X9xzqum1u8zoMXdaVe3hO6YmSH9Y+BlY8FqjIbhgn13quufpzX8oWFfiuufEP4WwArIfVMn6m0+DUl9K6/lvuotGnuhbSmxQqsjcjzQOrvzD/z1zwbfviLMb5X0IKJz7md+1l1UsTO37b4xlJeD4WX8RL4AmMxeqtH7KaUp4volaMRdFxXLRaKDWGNuydI/HYCJ3tlB1+gMeGoXoFvty3BtwP+YH3H6cZeC9k0nWfMfYFC6JgAUq5iiu0dmJVfeJcNkaRwo0TwjRdz+zIflqTSxG7XDQm28LQq6gh598MpzDF4v97escYXFGzxHUn4UgUMJ02FC8espg6AwVQovdNZln2StMIHk9F7+IV/EllJyLFYV3LQufZ27ZoFtOpaQi4AMjocfk93cgz0UKAAGYkQjXau6fOrCW6TRi0/GA78OTxUgUA9VHcXL/oXpoVhSDLc/2Ynf0U1Gp/QJ1l9ucfVK+hzguVqTIsmtrYMj2FQGBmKsrSzRo1f/vnXW3Z2+FT8wlkTQBxeavFovEb81W0MosqEPghlCCqR2wHVYTuXM8o+V9nxm6Z859Q9ieSvtsXHqvIcZn+8Uy2PgPRUQdUMnJ0FORPv56/JHFoP+IZBza3GvUeWiwyk5Qv6IV4jwoDLWYOOz35gVIoQOICh3RJ/Sh1+ZqZXU4dTMwGixLHa4PLGHHBKeNxscJRsDxMGrQ0u0xCZqIDBBV5DsP47DZNTIJqHDsuKmMr90ayNWLCSNUdrD92GcfoM+Hj5j5DbPtgiDG4YJmfoz3rox2UJFhsO3Q10/2lZBYONO+7hASg6KtWfObad5zWgNwdr/GpkPMdA23G+8DsOTJ+gi35n4GxJBFUEL7VBsaoWl9yqHaWcBiLqHkwjj9SHlvHs5y3Dlun0lHFGls2T5wqXcNxkP41rprWCrQF2QhdCwnoLAzaW6QMgbQjOCkAZpvFkk/5DhOjM+wxbqF2kQsU1DlrCzNOnu3ncDfv/hpEVEiAUOu6fERpqfgezEZwKdhyEgmysrxrpF/M5hd5Jsk3y7U4iLJBvx4ALf/2FRtNW7JnPEhYraGA29/+cQIfzVa7Iz8k2ZgvOCu1p4VU2VenyDcNsfAGlFQ/wcDL22yyfrIymGBb3a/aeHG72CBMoI+4JSAF5p564f+6PyV2TWM/fENB9vCtygxZgkNLjp+XJVb96NpVURreoNeopYCC+y0sFZUvTbx+BrMqZxuxz8ZtEN8Eax0EnEjkjEQM/maZakcb7A232jLUKSkpyuV8UdvVZPNufaflFyn1pBE/mEZ57dCPwP6SZRd7yRHAIQskURkst0R87Vf+XFcQfnUIX09iKB6hd8uQY35voOTf2MDMTkmvUOj1YKt6Nc/lgU0YPZ58yP3b32h+Yn1ErsVXS7CD3cp2KTrsfillBGdwGJ1T950+dAr2hQumO/7tD8BYWk3UMxZrb2CA7MYAAAAAAAAAAAAAA=";
const NAV  = "data:image/webp;base64,UklGRvYIAABXRUJQVlA4IOoIAACwKwCdASrcALkAPpFIn0ulpCKho9jI+LASCWdu4XYA6l4Tb2Nnbr9Lm4LcT+p7/VeDfjp96SLrjvsli55R/FLUC9d7tmAD629/dqiKytATxe9ET1h7Bn7AdbMV5ng2zwbZ4Ns8G2eDbPBtngluFuixsFdN2vfwZo+nkadRPvurMacBIzA8/gPWjN3rD8gGVBWrBEpI4asM0EUOAEmsE0dEWmhUVRfVtg5xXoIvmlQgyu/1dm71QD4h27hBuGXkgs5Ge+nDQEzRkJaaLl9iZD6xLHVrPH8wWApyEynVA3/+SSlo5czGTkwFQvYbvWU64lrTf2fVZFhfrB6++WKvRJT7GJZRchp3UM6yisb284TmC/XesbrntP/u0kBFFiYCiZ90exV4pGlwab/rgewoa3FtZfWq2EljXG1OfpR4vsldntoB+PvSsEy2sjLF+So1axu9ZbKWTtLEmwiTYRJsIk2ESbCJNgkAAP7/Rz//4C/GT9GcqIgwLCbL0IAkUPMbyAaqe0SLd9kM1PvQ0bewFbtOjuEqtx0soiAmImIWIck3w9hZUuGuoJ0HsWp4/L8JEIaGxtMvlkNqWunnaM8yrPROUrmzyWewgAlblp/c3h6RUpLAyP/GYOxJjo5UGTkXGOtw/pLMhzHwPiCI/yRRbwL/qAYGQFXuHbHW9DlfqZLH5CwzxyktJLxrC+xAScBvZSOVirtOZt/BdVaLG5czgu65gzr+SCf5MgAp532v7fvE+yx7Jdn9avDq4RvMS7lleFZ6V7BWE/xHft//PUpEcf2EYHgYyvIoii2d+bKKXyiqunK2p60LXqhJDfhCL60QTvEeEPky3PV20ZYvhC6wjy064teUqMZi7t9HcP/v4iTnN0dzj2IKj3xOkLuq7CF9sLAJf/cWHpK5XRtPiaqBS/n2kRLGbiN8Ymn6qU/5RX+eUq8Bi0ZiCq4HWo8LFrlTbYw7wV9MRydZbELeH29U4xrCiwMJGvIWXC4oHY9iOU56cLvDX9RyzTjtWJ8uTSX5L8AS4yR4cJqO+KOjpsczv6M+n5R7ivZDf2eT3XsObaXtQ1dtQaf/MHaV0W5yZ1V8Hu0ODq/B37wV/gK2W8kTAYqAPXO8kRGB6ikjiyoOkhQF5xJQhw5eHvHRTZolmopZ1bCWu8v9zFlEGovBECjKwvmtq5aXjxSrRtNOM6KDIp1no/ihAEOOSH74qv13wWtVb2MFPnHMVaXXnzLYVA/mcz/XEdSSjknB+ZW+pd5MRIUGe6yM8UI5hcXf/rV1Pn6ouVoU/Vwyi9BLeVv5+o8N4ZJFyWq/3dohbKWTshAL9MS9r88PHC9Q59E/Y49Isr6z3VTpZ6dxr9838JEj0UPBdl8UToW1oW8ED5ZIf/wprd11uCX716ZPvISPjbxEXL48JCNhbJ1vUDbh+NmAsESm9LGmwaIZbIcSwOFtv1wbg99bFasgfzLtc86zDvRXxi9kGzGfLtz6/QHz0NqIqredNgjvnwF9LmWN/nxgrX330L0XNQYlSRrNs71Hwf0HgvFp70WT4hJRL8DQqoM7EhfDHXq4M4CSTlSMrPWH8cXluuzWx2nAO+/sfWVx2eOQIdljd/RDG07jE80yziq6puJOq5Cky3PlSf6tjgS3xeD8OCS/aNxwN1yXoyauAEHhDVRPd5zHr8R8GbkgnbS89HVhqynvnetplMwkoPenPkQlHmrDBPCUfyJzQlhebcE8yz0POzheH2iFYY8WKYKvxNCtUtWpn4MbmgK27vIMaOf4IgyFhlP3tsJfMeLHFxMI3k0EXFOekOXcqNHpLTSJdTxYl3cWximIbsq2tyIfb9PeY8SukfgGwhZ9xv3MnILULNS/2xzuQYbx57p3b82VAJOiCqFyyaDfTDf8L94POD/wc0+V9e1mFzkIZ5MtXcEfe+YTYccp5INO2UattRdZ97TbeHjhcFl1UuPqkqb11cW9frVacLXL0nSZjHGeh+kxfzGK8tiIWvITCTsdyw56bgdsJ6jU8/E6xKCwLym5QLOV0Zv6EEOEF9P03yDW0RL1v3c09iY1cIkm2HRYzu/3lL0rEh+ySwh7tMQj4owqeAQTXvjvlWHQJV7WGkwzSP/b1cqHyiKr499JveXUybjeZLctU8Uk5mhI7DppUbksLLkr/vtIzgHdaQjUhqQM7GyfFsX+h7lUgqbbMqKXHxQJr+8JYJtwGRqEb/O/MIk753vFVPr4bvCXjSLx7IvL8NFQAfnNrxJ+syyWpnBvD0yP38h4nepslV8BooVlpQrNoOLSB/FJ8xHDSm6BEJqXzAe3pPCNtY8kB+WlKjtLSoDH/OT+AbS5lXnq+PBzVZq5TN8cSq4Ss4ZJc59BnGAA2N+r1PFi4y6G5Z/QoQxagmE9bpBIdsmaoI6AyZruWHtZGiYGYh3SVVvJIHCHOIIF12s3OeSiY9cu9sjtDnPDjLfpeBcgbBDOqOwNl/OJYwKsEvPKV9dRJ0atmRD7HRVI8+piJ6uyjFnVMDalUr7In5GOQZZUG6I9CJJHKyTnyYc3q+H5+iZVcQwpioQZXPqJydJ8n21H4qk1ODxK3S8d9uwvpX3YDDjWPZIoWn6QwLTDadLz7rVmILgt/wTELbRAZjg/6Z0VyXk8QM9/vpabkxeBy6wjOT1AyQqUI8KLP1fOLaWNb+k1Z+yg6TMO1FBX8L0wNqgihhT/gV04+qbBu70wFZm+tvMMvF4O52HVrDYV/+3DRyyFCA3yTG8r7QD4bT7gT5dOJvwQqhADhG5PWi7wRo+T5AsyZ/Fq+qWAYMlS2Ix4O8/bUYtDKH6nOVFyCpMUuo23D3Rm/8jWV9ZASg+xSWuELYPVC3gpsL9QFvDOmI55TRxp4ZnWYWyrm1EPqxZlLSC0Nul43ztvVOOSvGx72hl6HGRBIUxIimMQHWk8YikXawqJJqUMUe+8k7yW/Fd9Vjeu6oF5QU7dYaDbG+j5IkAR1PzeWjd9dJvaaRD56oO5JI2cKyXB7jAq6mMg0hsqMknxMxKwxiwS6tgCNpXlLR/EbW3AAAw2wxE7mIAAAA==";

const C = {
  brand:"#D5D492", brandDim:"#C8C880",
  dark:"#113009",  mid:"#3D6030",
  bg:"#F2F5E2",    sf:"#FFFFFF",   sfOl:"#EEF0D5",
  tx:"#0E2808",    txM:"#3A5030",  txS:"#6A8060",
  bd:"#D0D898",    bdL:"#E4E8B8",
  wh:"#FFFFFF",    red:"#C44040",
  el:"#5F7753",    reg:"#D4D39A",  rl:"#90A982",
};

const EVTS = [
  {title:"VECTORプログラム", date:"2026/06-", tag:"教育プログラム", loc:"東京都", price:"¥4,000", s:30, t:60},
  {title:"地方創生ビジネスコンテストin多賀城", date:"日程調整中", tag:"ビジネスコンテスト", loc:"宮城県多賀城市", price:"¥20,000", s:50, t:100},
];
const PRODS = [
  {name:"RL Tote Bag", price:"¥3,800", tag:"NEW",  desc:"オーガニックコットン製", em:"◼"},
  {name:"RL Hoodie",   price:"¥9,800", tag:"人気", desc:"南魚沼産コットン使用",  em:"◼"},
];
const POSTS = [
  {id:1, u:"田中 翔太", h:"shota_tanaka", av:"T", time:"2時間前", c:"【DXハッカソン2025】参加者募集！\n南魚沼を舞台に2泊3日のイベントです", lk:24, cm:8,  rp:5, tag:"ハッカソン"},
  {id:2, u:"佐藤 莉奈", h:"rina_sato",    av:"S", time:"5時間前", c:"Re.Connect Niigata、今月末開催！\n新潟の若手起業家・学生が集まります—",  lk:18, cm:5,  rp:3, tag:"交流会"},
  {id:3, u:"山田 葵",   h:"aoi_yamada",   av:"A", time:"1日前",   c:"農業×テック Summit 登壇者決定·\nスマート農業の最前線が集結します",      lk:41, cm:12, rp:9, tag:"カンファレンス"},
  {id:4, u:"鈴木 健太", h:"kenta_suzuki", av:"K", time:"2日前",   c:"地方創生DXフォーラム\n共催パートナー募集中！",                             lk:15, cm:3,  rp:2, tag:"フォーラム"},
];
const ELM = [
  {name:"木寺 蒼真", role:"代表",                    av:"K", since:"",        bio:"Regional Lab 創設者"},
  {name:"中原 光輝", role:"副代表",                  av:"N", since:"",        bio:"Regional Lab 創設メンバー"},
  {name:"渡邉 輝",   role:"Re.Event 事業統括責任者", av:"W", since:"2025/01-", bio:""},
  {name:"峯 奏音",   role:"Re.Lab 事業統括責任者",   av:"M", since:"2025/04-", bio:""},
];
const MTS = [
  {title:"月次全体ミーティング", date:"5月10日", time:"19:00〜21:00", type:"定例",   desc:"5月の活動報告・今後の方針共有", p:18},
  {title:"企業研究会議 Vol.8",  date:"5月14日", time:"18:30〜20:30", type:"企業研究",desc:"スタートアップ事例研究",        p:12},
  {title:"時事会議 Vol.15",     date:"5月21日", time:"20:00〜22:00", type:"時事",   desc:"最新の地方創生政策を議論",      p:15},
];
const BIZ = [
  {
    tag:"地方創生2.0", tagColor:"#113009", em:"️", rt:"6分",
    title:"政府が「地方創生2.0」始動 — 令和の日本列島改造へ",
    summary:"石破政権が掲げる「地方創生2.0」が本格始動。単なる移住促進から脱却し、人口が減っても経済が成長する「適応型地方創生」へシフト。2025年6月に基本構想が閣議決定された。",
    points:[
      "5本柱：しごと・ひと・まち・デジタル・安心の創生を同時推進",
      "若者・女性に「選ばれる地域」づくりを数値目標で明記",
      "TSMC熊本・ラピダス北海道など大型投資を地方経済の起爆剤に",
    ],
    insight:"「地方創生2.0」はRegional Labが掲げるビジョンと方向性が完全に一致。官民連携の追い風が吹いている。",
  },
  {
    tag:"デジタル田園都市", tagColor:"#3D6030", em:"△", rt:"5分",
    title:"デジタル田園都市構想2026 — ドローン・AI・遠隔医療が地方を変える",
    summary:"2026年度もデジタル田園都市国家構想の交付金が継続。ドローン配送・AIデマンド交通・遠隔診療が全国の地方自治体で実装フェーズに入った。",
    points:[
      "過疎地へのドローン配送が実用化。生活インフラの維持コスト削減へ",
      "AI活用のデマンド型交通が地方の移動問題を解決しつつある",
      "デジタル人材育成目標：2026年度末までに230万人",
    ],
    insight:"デジタルは都市の特権ではなくなった。地方こそ「実験場」として最先端実装が進んでいる。",
  },
  {
    tag:"関係人口", tagColor:"#5F7753", em:"—", rt:"5分",
    title:"「関係人口」が地方を救う — 移住しなくても地域を支える新概念",
    summary:"住まなくてもその地域を応援・関与する「関係人口」が注目されている。観光以上・移住未満の存在が地方の担い手不足を補う新たな潮流。2026年も自治体の関係人口戦略が加速。",
    points:[
      "定住人口・交流人口に続く「第3の人口」として政府が本格推進",
      "副業・兼業解禁の流れで都市在住者が地方プロジェクトに参画増加",
      "SNS・オンラインで繋がり続けることが継続的な地域支援に直結",
    ],
    insight:"Regional Labのコミュニティ自体が「関係人口」を生み出す仕組み。会員一人ひとりが南魚沼の関係人口になれる。",
  },
  {
    tag:"AI×地方", tagColor:"#113009", em:"∆", rt:"5分",
    title:"地方×AI 2026 — 中小企業・農業・観光のDX最前線",
    summary:"AI活用は大企業だけのものではなくなった。地方の中小企業・農業・観光業でも生産性を劇的に高める事例が続出。「AIを使う側」と「使わない側」の格差が急拡大している。",
    points:[
      "農業：AIによる収穫量予測・病害虫検知で廃棄ロスを削減",
      "観光：多言語AI接客でインバウンド対応コストを大幅削減",
      "中小企業：生成AIで営業資料・SNS・補助金申請書を自動作成",
    ],
    insight:"今がスタートライン。地方の小さな組織ほどAI導入の恩恵が大きく、競争優位を一気に築ける。",
  },
  {
    tag:"スタートアップ", tagColor:"#2A4820", em:"↗", rt:"5分",
    title:"地方発スタートアップ急増 — 政府「育成5か年計画」の総仕上げ",
    summary:"政府のスタートアップ育成5か年計画が2026年に総仕上げを迎える。地方でのVC投資・起業支援拠点整備が加速し、農業・観光・医療・教育分野の地域課題解決型スタートアップが増加中。",
    points:[
      "地方スタートアップへのVC投資額が年々拡大し続けている",
      "空き家活用の起業支援・外部人材受け入れが各地で本格化",
      "地方を「実証実験の場」として活用する大企業との連携が増加",
    ],
    insight:"地方であることがハンデではなく、「リアルな課題×独自性」という強みになる時代。南魚沼にもそのポテンシャルがある。",
  },
  {
    tag:"インバウンド", tagColor:"#4A6B3A", em:"◉", rt:"6分",
    title:"インバウンド3,500万人時代 — オーバーツーリズムと地方観光の活路",
    summary:"訪日外国人が年間3,500万人超で過去最高を更新する一方、混雑・マナー問題が深刻化。「高単価×少人数×体験型」の上質な観光モデルが地方の活路として注目されている。",
    points:[
      "2026年アジア競技大会など国際イベントでインバウンド需要がさらに拡大",
      "「コト・トキ消費」へのシフトで地方の体験資源に高い需要",
      "異業種からの観光参入が加速。地方の宿・農業・文化体験が商品化",
    ],
    insight:"南魚沼の雪・農業・温泉・食文化は「本物の日本体験」として国際的に高い価値を持つ。",
  },
  {
    tag:"資金調達", tagColor:"#5F7753", em:"¥", rt:"6分",
    title:"2026年版 地域事業者が使える補助金・助成金まとめ",
    summary:"地方創生交付金は2025年度に2000億円（前年度比倍増）が計上された。2026年度は一部見直しがあるものの、デジタル実装・スタートアップ支援に絞った重点投資が続く。",
    points:[
      "事業再構築補助金：新分野展開・業態転換に最大1.5億円",
      "ものづくり補助金：設備投資・システム開発に最大1,250万円",
      "地方創生推進交付金：地域の自主的取り組みに国が財政支援",
    ],
    insight:"補助金は「もらえるもの」ではなく「事業計画書の精度」で勝敗が決まる。Re.Labの⑳事業計画書の学習が直結する。",
  },
  {
    tag:"人口・移住", tagColor:"#4A6B3A", em:"→", rt:"5分",
    title:"Jターン・Iターンの波が継続 — 地方移住2026年の実態",
    summary:"働き方の多様化定着により、豊かな自然環境を求めて地方へ拠点を移す動きが2026年も続いている。自治体側も一時的な移住支援金から「長期的なコミュニティ形成」へと戦略をシフト。",
    points:[
      "東京圏への転入超過は続くが、地方移住希望者数は過去最高水準",
      "「週2地方・週3都市」のデュアルライフが若年層を中心に定着",
      "山梨・長野・新潟など自然豊かな地域への移住が特に増加傾向",
    ],
    insight:"南魚沼市は移住者にとって理想的な環境。Regional Labがその受け皿となるコミュニティを担える。",
  },
];

const BSC = [
  {
    no:"①", title:"マネジメント＆ファイナンス＆マーケティング＆プロモーション",
    tag:"導入", section:"0. 導入", rt:"8分",
    desc:"自立して人生を生きていく中で、4項目のエキスパート知識が必須である。就職・起業・フリーランスいずれの選択肢を取ったとしても、組織をマネジメントする能力は前提条件として求められる。ファイナンスがわからなければ予算を出せず、企画書すら遂行できない。マーケティングとは自身を分析する自己分析であり、プロモーションはブランディングである。これらがあなたの人生を彩り、奥行きや幅や深みをつけてくれるだろう。ようこそ、新しい世界へ。",
  },
  {
    no:"②", title:"ウォンツ＆キャン＆ニーズ",
    tag:"導入", section:"0. 導入", rt:"4分",
    desc:"やりたいこと（ウォンツ）でも、できなければ（キャン）意味がない。反対に、できること（キャン）でもやりたいこと（ウォンツ）でなければ無駄な時間である。やりたいこと（ウォンツ）で、できること（キャン）であっても、社会的な需要（ニーズ）がなければ孤独であり実らないであろう。つまり、自身の人生軸はこの全ての交差点から導き出せば良い。これはビジネスにおけるターゲット選定においても同様である。",
  },
  {
    no:"③", title:"強み＆弱み分析",
    tag:"導入", section:"0. 導入", rt:"5分",
    desc:"表面的な強みとはできることであり、本来の強みとはできることで、やりたいことである。強み＆弱み分析はデスクの上で考え込むものではなく、行動し経験した結果として浮き出てくるものである。ビジネスにおける強み＆弱み分析とは一種のマーケティングであり、他社の強み＆弱み、自社の強み＆弱み、社会に対する市場の強み＆弱みを分析するものである。ビジネスとは不の解決である。",
  },
  {
    no:"④", title:"理念＆ミッション＆ビジョン＆カラー",
    tag:"導入", section:"0. 導入", rt:"6分",
    desc:"理念とはそのコミュニティ・個が墓場まで持っていく不変の軸のことである。ミッションとは大きな的であり目標であり理想であり、コミュニティや個が掲げる夢のことである。ビジョンとは現状とミッションとのギャップを埋めていくための逆算的なロードマップであり、現状に近づくにつれ解像度が徐々に上がっていくものである。カラーとはブランディングであり風土である。細部を調整してこそ、美が生まれ、引かれる。",
  },
  {
    no:"⑤", title:"仮説＆検証＆問題＆原因＆解決",
    tag:"導入", section:"0. 導入", rt:"4分",
    desc:"このプロセスは原点にして、物事の本質である。まずは仮説と検証を繰り返しまくろう。そして問題・原因・解決の自己完結をしよう。これらを呼吸のように脳裏で行おう。そうすれば自立していく。ビジネスにおいても同様であり、これら全てのプロセスはマーケティングである。プロセスから高みを目指そう。",
  },
  {
    no:"⑥", title:"フロントエンド＆バックエンド",
    tag:"序説", section:"1. 序説", rt:"7分",
    desc:"ビジネスにおいて一番重要なものはお金ではなく信頼構築である。フロントエンドとは信頼構築であり顧客を見込み顧客に移すプロセスであり、バックエンドは見込み顧客を新規顧客に移すプロセスであり本来売りたいものを売るフェーズである。世の中のビジネスはフロントエンドが8割、バックエンドが2割の構図で行われている。フロントエンドとバックエンドの構図さえ掴めてしまえば、マネタイズは容易であり、ビジネスモデルの構築も容易である。",
  },
  {
    no:"⑦", title:"アップセル＆クロスセル",
    tag:"序説", section:"1. 序説", rt:"4分",
    desc:"アップセルとは顧客が選んだ商品より上位・高機能・高価格な商品へ誘導する手法であり、クロスセルとは購入予定の商品に関連する別の商品やサービスを追加購入してもらう手法である。アップセルの目的は顧客単価の向上や顧客満足度の向上であり、クロスセルの目的は購入点数の増加や顧客体験の拡張・顧客単価の向上を狙っている。両手法ともに世にありふれており、自分視点での具体的な例を探してみよう。",
  },
  {
    no:"⑧", title:"20：80の法則（VIP戦略）",
    tag:"序説", section:"1. 序説", rt:"8分",
    desc:"結果の8割は原因の2割から生まれるというパレートの法則である。ビジネスでは売上の8割は全顧客の2割という優良顧客がもたらしているといったものや、売上の8割は全商品の上位2割の売れ筋商品が占めているというものがある。8割を生み出す重要な2割の原因や顧客・商品などを特定し、そこに時間・人員・予算などのリソースを集中させることで、効率的な成果である8割を作り上げることができる。ベガス・旅客機・寿司屋・ゲームビジネスにその構造が見える。",
  },
  {
    no:"⑨", title:"課題の三段層",
    tag:"序説", section:"1. 序説", rt:"5分",
    desc:"課題には三段の層がある。一段目は顕在的な課題（我々が通常捉える課題）。二段目は潜在的な課題（背後に隠れている要因や障壁）。三段目は深層課題（潜在的な課題に眠る不鮮明な仮説段階の要因・障壁・心理的要因までも突き詰めた最終的な課題の深堀地）。社会的なインパクトを生み出すサービスやプロダクトは基本的にこの三段目の深層課題まで行き着いているものである。解決したのに効果が今一な状況はこの三段目まで捉えられていないからである。",
  },
  {
    no:"⑩", title:"ポートフォリオ戦略",
    tag:"序説", section:"1. 序説", rt:"7分",
    desc:"ポートフォリオ戦略とはリスク分散を用いた現状からの利益の最大化を図る戦略であり、リスクを最小限にしながら挑戦をし続けられる戦略である。売上1億円を目指す際、一つの事業での1億円と4事業の総和としての1億円は難易度が全く違う。まず月10〜15万以上の安定収入源を確保し、剰余金を投資に回しながら、本来行いたい挑戦にリソースを投入することがポートフォリオ戦略の理想形である。博打ではなく、挑戦をし続けられる状態を維持することが目的である。",
  },
  {
    no:"⑪", title:"売上の方程式",
    tag:"本説", section:"2. 本説", rt:"4分",
    desc:"「売上＝単価×客数（×リピート数）」。客数が多いのに売上が良くない場合は単価が低いからであり、単価が高いのに客数が少ない場合はその逆である。どのラインが需要供給均衡ラインかを見極める必要があり、全体のリピート率が7〜8割を見込めるラインであり、リピート回数が3回以上見込めるラインが限界単価であり限界客数である。如何に付加価値とレバレッジを持ってこれるかが大事であり、これこそ仮説＆検証＆問題＆原因＆解決のスキルが問われるものである。",
  },
  {
    no:"⑫", title:"マネタイズ",
    tag:"本説", section:"2. 本説", rt:"6分",
    desc:"マネタイズとはファイナンスである。売上高から売上原価・販売管理費を差し引いた利益が営業利益（純利益）と呼ばれる。粗利とは営業利益と販売管理費を含めたものである。このファイナンスの構図が頭に入れば、どのビジネスモデルが効率よく最大利益を生み出せるかの思考が柔軟に行えるようになる。マネタイズとはビジネスの縮図であり、マネタイズをしてみれば、ビジネスを学べる。まずマネタイズから始めてみよう。",
  },
  {
    no:"⑬", title:"BS/PL",
    tag:"本説", section:"2. 本説", rt:"7分",
    desc:"BSとは貸借対照表（ストック）であり企業の体力や状態といった財政状態を表す。PLとは損益計算書（フロー）であり企業の活動や運営といった経営状態を示すものである。BS/PLが読めれば企業分析が容易となり、マネタイズも容易となり、投資も容易となり、ビジョンも明確になる。しまむら（仕入れ型）とユニクロのファーストリテイリング（SPA型・製造小売型）のBS/PL比較により、両社のビジネスモデルの構造の違いが見て取れる。",
  },
  {
    no:"⑭", title:"ROI＆ROA＆ROE＆PER＆PBR＆EBITDA",
    tag:"本説", section:"2. 本説", rt:"6分",
    desc:"投資家が企業を判断する際の主要6指標。ROI（投資対利益）は10〜13%が相場で15〜20%以上が最良。ROA（資産対利益）は3〜5%が相場で7%以上が最良。ROE（自己資本対利益）は8〜10%が相場で15%以上が最良。PER（株価収益率）は15倍程度が相場で15倍以下が最良。PBR（株価純資産倍率）は1.0倍程度が相場。EBITDAは営業利益＋減価償却費で買取価格はその8〜10倍が目安。これらを理解した上で投資に挑戦してみよう。",
  },
  {
    no:"⑮", title:"KPI＆KGI",
    tag:"本説", section:"2. 本説", rt:"4分",
    desc:"KGIとは重要目標達成指標であり最終的に達成すべきゴール。KPIとは重要業績評価指標であり具体的でコントロール可能な行動や過程を表した中間目標である。これらの指標はSMARTの法則（Specific・Measurable・Achievable・Relevant・Time-bound）に沿った非常にわかりやすい指標である。組織として各メンバーがどういうタスクを行いどういった目標で何をすべきかを可視化するKPI＆KGIの提示は組織運営において必須である。",
  },
  {
    no:"⑯", title:"ブランディング論",
    tag:"末説", section:"3. 末説", rt:"7分",
    desc:"ブランディングの方程式は「認知度×希少性×（独自性＋一貫性）」である。ルイ・ヴィトン・ロレックス・フェラーリはこの方程式を体現している。ブランディングの本質は人間の認知バイアスを操るところにある。だからこそ常に一貫した自分を持つことが大事であり、希少性のあるものでなくてはならない。自分を確立できない者に、組織を確立はできない。ブランドで物事は動かせる。ブランド力で社会は動かせる。",
  },
  {
    no:"⑰", title:"ペルソナ＆ターゲット",
    tag:"末説", section:"3. 末説", rt:"5分",
    desc:"ビジネスにおいて一番のペルソナとは自分である。顧客目線でみた時、自分ならそのサービスを利用するのか。個人は社会という集合体の単体であり、その単体の言動はその集合体の縮図である。ビジネスにおいて一番のターゲットとは案外身近な人間なのである。なぜ全て身の回りで完結し得るのか。それは説得力が一番あるからである。何か言語化できないけど課題感やニーズは、案外はじめは小さく身近に隠れている。",
  },
  {
    no:"⑱", title:"ベンチマーク＆優位性＆ポジショニング",
    tag:"末説", section:"3. 末説", rt:"6分",
    desc:"ベンチマークとは自身や自社の目標となる他社・他者を指し、その対象との差分を測る行為である。優位性とは競合他社が容易には模倣できない自社・自身固有の強みのことであり、価格・品質・スピード・関係性・ブランドなどがある。ポジショニングとは市場や競合の中で自社・自身がどの立ち位置を占めるかを戦略的に定めることである。ベンチマークで差分を知り、優位性で武器を磨き、ポジショニングで居場所を定める。この三点セットが揃ったとき、ビジネスは市場で語れる存在となる。",
  },
  {
    no:"⑲", title:"イノベーター理論＆集客＆営業",
    tag:"末説", section:"3. 末説", rt:"6分",
    desc:"エベレット・ロジャーズのイノベーター理論は人間の新しいものへの受入速度を5層に分類する。イノベーター2.5%・アーリーアダプター13.5%・アーリーマジョリティ34%・レイトマジョリティ34%・ラガード16%。アーリーアダプターとアーリーマジョリティの間には「キャズム」と呼ばれる深い溝があり多くのビジネスはここで消えていく。集客とは見込顧客を集める行為で、営業とはその見込顧客を顧客へと転換する行為。最も大事なことは集客も営業も信頼構築である。",
  },
  {
    no:"⑳", title:"事業計画書",
    tag:"末説", section:"3. 末説", rt:"8分",
    desc:"ここまでの学びの全てが事業計画書という一枚の設計図に結実する。事業計画書とはあなたが描く未来への意志を言語化したものであり、投資家・銀行・従業員等の全ての関係者への説得材料として用いられる。記載項目は理念/ミッション/ビジョン・市場と課題分析・ターゲットとペルソナ・競合と優位性とポジショニング・ビジネスモデル・売上と収支計画（PL）・KPI/KGI・集客と営業戦略・ブランディング戦略・資金計画の10項目。事業計画書を書く上で最も重要なことは「なぜあなたがやるのか」という問いへの回答である。",
  },
];
const RL_MENU = [
  {k:"biz",    i:"briefcase",t:"ビジネス情報",      s:"最新の地域ビジネス・政策情報"},
  {k:"basic",  i:"book",     t:"前提基礎知識",      s:"地方創生・DXの基礎を学ぶ"},
  {k:"meeting",i:"building", t:"企業研究会議",      s:"スタートアップ事例研究・ディスカッション"},
  {k:"jiji",   i:"layers",   t:"時事会議",          s:"最新の地方創生政策・トレンドを議論"},
  {k:"oneon1", i:"crown",    t:"社長1on1",          s:"代表とのプライベートセッション"},
  {k:"coach",  i:"users",    t:"コーチング",        s:"コーチとマンツーマンセッション"},
];
const PLANS = [
  {
    name:"Free", price:"¥0", pd:"/月", cur:true, color:C.sfOl, nameColor:C.txS,
    badge:"インストール時自動適用",
    ft:["アプリの基本機能を利用可能","Regional Labの情報閲覧"],
    stripe:null,
    planKey:"free",
  },
  {
    name:"Event Lab", price:"¥2,000", pd:"/月", cur:false, color:"#E8F5E0", nameColor:C.mid,
    badge:"イベント参加プラン",
    ft:["Event Lab 閲覧・利用権利","イベント申込・参加","フィード・メンバー閲覧"],
    stripe:"https://buy.stripe.com/fZu00j2qk56i2BUceZ7Re04",
    planKey:"el",
  },
  {
    name:"Event Lab Pro", price:"¥3,000", pd:"/月", cur:false, color:"#D4ECC8", nameColor:"#2A5820",
    badge:"集客サポート付き",
    ft:["Event Lab 閲覧・利用権利","イベント申込・参加","集客サポート 5名〜","フィード・メンバー閲覧"],
    stripe:"https://buy.stripe.com/7sY6oH2qk7eqb8q92N7Re05",
    planKey:"elpro",
  },
  {
    name:"Re.Lab", price:"¥15,000", pd:"/月", cur:false, color:C.dark, nameColor:C.brand,
    badge:"フル機能プラン",
    ft:["Re.Lab 閲覧・利用権利（全コンテンツ）","Event Lab 閲覧・利用権利（無条件付帯）","社長1on1・コーチング","企業研究会議・時事会議","前提基礎知識 全20項目"],
    stripe:"https://buy.stripe.com/fZu14n2qk8iugsKen77Re03",
    planKey:"rl",
  },
];
const MNEW = [
  {i:"edit",  l:"プロフィール編集",  s:"名前・所属・性別・学年など"},
  {i:"credit",l:"ご利用の料金プラン",s:"Free · ¥0/月"},
  {i:"bell",  l:"通知設定",         s:"プッシュ通知のオン・オフ"},
  {i:"mail",  l:"お問い合わせ",      s:"InstagramのDMへ"},
];

/* ══ Regional Lab 紹介データ ══ */
const RL_HISTORY = [
  { year:"2024/10/09", title:"Regional Lab 設立", desc:"都内某所にて、地方創生の思いを語り、現代表と現副代表の2名にて設立。" },
  { year:"2024/12/22", title:"イベント事業リリース", desc:"地域創生アイデアソンをオンラインにて開催。新潟県南魚沼市の地域課題をテーマに、各チームの事業アイデアをコンテストとして募る。イベント後には交流会を設け、更なる機会創出を提供。" },
  { year:"2025/03/23", title:"初のオフラインイベント", desc:"地域創生ビジネスコンテストを東京スクエアガーデン7Fにて開催。新潟県南魚沼市の地域課題をテーマに、各チームの事業プランやアイデアをコンテストとして募る。イベント後には交流会を設け、更なる機会創出を提供。" },
  { year:"2025/04", title:"コミュニティ事業のリリース", desc:"地域創生研究部、ビジネス研究部、イベント事業部の３つのコンテンツを設け、コミュニティを通して、人事コンサル支援や教育プログラムを提供。" },
  { year:"2025/09/08-10", title:"初の共催イベント", desc:"第一回地方創生ビジネスコンテストin秋保を秋保蘭亭旅館にて(株)遊然様と共催。宮城県仙台市秋保温泉地域の地域課題をテーマに開催。10チーム中2チームがイベント後も事業構築に向けて走り、本質的な地域課題解決に向けた事業創出の機会演出として役割を担う。" },
  { year:"2025/09/21", title:"初のメンバー主体イベント", desc:"地域創生×国際交流イベントを開催。日本の伝統文化や魅力等に関する需要調査や異文化交流と地域課題の解決議論を行う。インバウンドによるオーバーツーリズム等の地方創生分野における地域課題の議論や情報共有も設けた。" },
  { year:"2025/12/21", title:"総勢100名程の大規模イベント", desc:"地方産品大忘年会を東京スクエアガーデン7Fにて地方創生団体リーボシ様と共催。日本各地の地方産品をより集め、学生から社会人、社長様方まで多方面にわたりご参加を募り、世代や垣根を超えた大交流会を設ける。" },
  { year:"2026/03/16-18", title:"地域密着型大規模イベント", desc:"第二回地方創生ビジネスコンテストin蔵王をメルキュール宮城蔵王スパ&リゾートにて(株)遊然様と共催。宮城県蔵王町遠刈田温泉地域の地域課題をテーマに開催。10チーム中3チームがイベント後も事業構築に向けて走り、本質的な地域課題解決に向けた事業創出の機会演出として役割を担う。" },
];

const RL_MEMBERS = [
  { name:"木寺 蒼真", role:"代表", av:"K", since:"", bio:"Regional Lab 創設者" },
  { name:"中原 光輝", role:"副代表", av:"N", since:"", bio:"Regional Lab 創設メンバー" },
  { name:"渡邉 輝",  role:"Re.Event 事業統括責任者", av:"W", since:"2025/01-", bio:"" },
  { name:"峯 奏音",  role:"Re.Lab 事業統括責任者",   av:"M", since:"2025/04-", bio:"" },
];

/* ══ SVGアイコン ══ */
function Ic({ n, s=20, c="currentColor" }) {
  const S = { width:s, height:s, display:"block", flexShrink:0 };
  const maps = {
    home:      <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    globe:     <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    lab:       <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v11l3 6H6l3-6V3z"/><line x1="9" y1="9" x2="15" y2="9"/></svg>,
    user:      <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    chevL:     <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    chevR:     <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    menu:      <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close:     <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    comment:   <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    repost:    <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
    calendar:  <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    mapPin:    <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    clock:     <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    mail:      <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    credit:    <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    edit:      <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    bell:      <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    shield:    <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    logout:    <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    book:      <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    briefcase: <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    star:      <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    check:     <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    crown:     <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><line x1="5" y1="20" x2="19" y2="20"/></svg>,
    building:  <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="15" y2="15"/><rect x="9" y="18" width="6" height="4"/></svg>,
    layers:    <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    users:     <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    person:    <svg style={S} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>,
  };
  return maps[n] || null;
}

function Av({ l, sz=40 }) {
  return (
    <div style={{ width:sz, height:sz, borderRadius:"50%", background:C.brand, display:"flex", alignItems:"center", justifyContent:"center", color:C.dark, fontWeight:700, fontSize:sz*0.38, flexShrink:0 }}>
      {l}
    </div>
  );
}

/* ══ Regional Lab 紹介ドロワー ══ */
function Drawer({ open, onClose }) {
  const [sec, setSec] = useState("about"); // "about" | "history" | "members"

  const SECS = [
    { k:"about",   l:"概要" },
    { k:"history", l:"沿革" },
    { k:"members", l:"メンバー" },
  ];

  return (
    <>
      {/* オーバーレイ */}
      <div
        onClick={onClose}
        style={{
          position:"fixed", inset:0, zIndex:500,
          background:"rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition:"opacity 0.25s ease",
        }}
      />
      {/* ドロワー本体 */}
      <div style={{
        position:"fixed", top:0, left:0, right:0, bottom:0,
        width:"100%", maxWidth:520, margin:"0 auto",
        background:C.bg,
        zIndex:501,
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition:"transform 0.32s cubic-bezier(0.32,0,0.15,1)",
        display:"flex", flexDirection:"column",
      }}>

        {/* ── ヘッダー ── */}
        <div style={{ flexShrink:0, background:C.dark, padding:"20px 18px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div>
              <div style={{ fontSize:10, color:"rgba(213,212,146,0.6)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:3 }}>About</div>
              <div style={{ fontSize:20, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", lineHeight:1.1 }}>Regional Lab</div>
            </div>
            <button onClick={onClose} style={{ width:36, height:36, borderRadius:10, background:"rgba(213,212,146,0.12)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Ic n="close" s={18} c={C.brand} />
            </button>
          </div>
          {/* セクションタブ */}
          <div style={{ display:"flex", gap:2 }}>
            {SECS.map(s => (
              <button key={s.k} onClick={() => setSec(s.k)} style={{
                flex:1, padding:"8px 0", border:"none", cursor:"pointer", fontSize:12, fontWeight:700,
                background:"none",
                color: sec===s.k ? C.brand : "rgba(213,212,146,0.45)",
                borderBottom: sec===s.k ? `2px solid ${C.brand}` : "2px solid transparent",
              }}>{s.l}</button>
            ))}
          </div>
        </div>

        {/* ── コンテンツ ── */}
        <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch" }}>

          {/* 概要タブ */}
          {sec === "about" && (
            <div style={{ padding:"18px 16px 28px" }}>

              {/* ミッション */}
              <div style={{ background:C.dark, borderRadius:14, padding:"20px", marginBottom:14 }}>
                <div style={{ fontSize:10, color:"rgba(213,212,146,0.55)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>Mission</div>
                <div style={{ fontSize:17, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", lineHeight:1.5 }}>
                  地方の魅力をお洒落に、<br/>美しく、上質に、
                </div>
              </div>

              {/* ビジョン */}
              <div style={{ background:C.sf, borderRadius:14, padding:"18px", marginBottom:14, border:`1px solid ${C.bd}` }}>
                <div style={{ fontSize:10, color:C.txS, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>Vision</div>
                <div style={{ fontSize:13, fontWeight:700, color:C.tx, lineHeight:1.6, fontFamily:"Georgia,serif" }}>
                  南魚沼を支える企業へ、<br/>地方の未来を彩る組織へ
                </div>
              </div>

              {/* 基本情報 */}
              <div style={{ background:C.sf, borderRadius:14, padding:"18px", border:`1px solid ${C.bd}` }}>
                <div style={{ fontSize:10, color:C.txS, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12 }}>Organization</div>
                {[
                  { l:"正式名称", v:"Regional Lab" },
                  { l:"設立",    v:"2024年10月9日" },
                  { l:"拠点",    v:"新潟県南魚沼市\n東京都・宮城県" },
                  { l:"事業内容",v:"イベント事業\nコミュニティ事業\nアパレル事業" },
                ].map((r,i,arr) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", paddingBottom:10, marginBottom:10, borderBottom: i<arr.length-1 ? `1px solid ${C.bdL}` : "none" }}>
                    <span style={{ fontSize:11, color:C.txS, fontWeight:600, flexShrink:0, marginRight:8 }}>{r.l}</span>
                    <span style={{ fontSize:11, color:C.tx, fontWeight:600, textAlign:"right", whiteSpace:"pre-line", lineHeight:1.6 }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 沿革タブ */}
          {sec === "history" && (
            <div style={{ padding:"18px 16px 28px" }}>
              <div style={{ position:"relative", paddingLeft:24 }}>
                {/* タイムライン縦線 */}
                <div style={{ position:"absolute", left:7, top:10, bottom:10, width:2, background:C.bdL, borderRadius:1 }} />
                {RL_HISTORY.map((h, i) => (
                  <div key={i} style={{ position:"relative", marginBottom: i < RL_HISTORY.length-1 ? 20 : 0 }}>
                    {/* ドット */}
                    <div style={{ position:"absolute", left:-20, top:4, width:10, height:10, borderRadius:"50%", background: i===RL_HISTORY.length-1 ? C.dark : C.brand, border:`2px solid ${C.dark}`, zIndex:1 }} />
                    <div style={{ background:C.sf, borderRadius:12, padding:"13px 14px", border:`1px solid ${C.bd}` }}>
                      <div style={{ fontSize:10, color:C.dark, fontWeight:700, background:C.sfOl, borderRadius:4, padding:"2px 8px", display:"inline-block", marginBottom:6 }}>{h.year}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:C.tx, marginBottom:4 }}>{h.title}</div>
                      <div style={{ fontSize:11, color:C.txM, lineHeight:1.6 }}>{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* メンバータブ */}
          {sec === "members" && (
            <div style={{ padding:"14px 0 28px" }}>
              <div style={{ padding:"0 16px 10px", fontSize:12, color:C.txS }}>{RL_MEMBERS.length}名のコアメンバー</div>
              {RL_MEMBERS.map((m, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px", borderBottom:`1px solid ${C.bdL}` }}>
                  <div style={{ width:46, height:46, borderRadius:"50%", background:C.brand, display:"flex", alignItems:"center", justifyContent:"center", color:C.dark, fontWeight:700, fontSize:17, flexShrink:0 }}>{m.av}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4, gap:6 }}>
                      <span style={{ fontSize:14, fontWeight:800, color:C.tx }}>{m.name}</span>
                      {m.since ? <span style={{ fontSize:9, color:C.txS, flexShrink:0, marginTop:2 }}>{m.since}</span> : null}
                    </div>
                    <div style={{ fontSize:10, color:C.dark, background:C.sfOl, borderRadius:4, padding:"2px 8px", fontWeight:700, display:"inline-block", marginBottom: m.bio ? 5 : 0 }}>{m.role}</div>
                    {m.bio ? <div style={{ fontSize:11, color:C.txM, lineHeight:1.5, marginTop:4 }}>{m.bio}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

/* ══ Home ══ */
function Home({ onMenuOpen }) {
  return (
    /* Fix: display:flex + flexDirection:column で高さを確定させ、
       スクロール領域だけに overflow:auto をかける */
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
      {/* 固定ヘッダー */}
      <div style={{ flexShrink:0, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 16px", height:54, background:C.brand, borderBottom:`1px solid ${C.brandDim}` }}>
        <img src={NAV} alt="logo" style={{ height:34, objectFit:"contain" }} />
        <button
          onClick={onMenuOpen}
          style={{ width:36, height:36, borderRadius:8, background:"rgba(17,48,9,0.12)", display:"flex", alignItems:"center", justifyContent:"center", border:"none", cursor:"pointer" }}
        >
          <Ic n="menu" s={20} c={C.dark} />
        </button>
      </div>

      {/* スクロール領域 */}
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
        <div style={{ background:C.brand, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"4px 40px 28px", minHeight:160 }}>
          <img src={LOGO} alt="brand" style={{ maxWidth:"72%", maxHeight:110, objectFit:"contain", display:"block", margin:"0 auto" }} />
        </div>
        <div style={{ padding:"18px 16px 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:15, fontWeight:700, color:C.tx, fontFamily:"Georgia,serif" }}>Event Lab ピックアップイベント</span>
            <span style={{ fontSize:12, color:C.dark, fontWeight:600 }}>すべて見る →</span>
          </div>
          {EVTS.map((e,i) => (
            <div key={i} style={{ background:C.sf, borderRadius:14, marginBottom:14, overflow:"hidden", border:`1px solid ${C.bd}` }}>
              <div style={{ height:78, background:`linear-gradient(135deg,${C.el} 0%,#3A5228 100%)`, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px" }}>
                <div>
                  <span style={{ background:C.brand, color:C.dark, fontSize:10, fontWeight:700, borderRadius:4, padding:"3px 8px" }}>{e.tag}</span>
                  <div style={{ fontSize:14, fontWeight:700, color:C.sf, marginTop:5 }}>{e.title}</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:22, fontWeight:800, color:C.brand }}>{e.s}</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)" }}>残り席</div>
                </div>
              </div>
              <div style={{ padding:"12px 14px" }}>
                <div style={{ display:"flex", gap:14, marginBottom:6, flexWrap:"wrap" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:4 }}><Ic n="calendar" s={11} c={C.txS} /><span style={{ fontSize:11, color:C.txS }}>{e.date}</span></div>
                  <div style={{ display:"flex", alignItems:"center", gap:4 }}><Ic n="mapPin" s={11} c={C.txS} /><span style={{ fontSize:11, color:C.txS }}>{e.loc}</span></div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:9 }}>
                  <span style={{ fontSize:11, color:C.txS }}>参加費</span>
                  <span style={{ fontSize:12, fontWeight:700, color:C.tx }}>{e.price}</span>
                </div>
                <div style={{ height:3, background:C.bdL, borderRadius:2 }}>
                  <div style={{ height:"100%", width:`${(e.t-e.s)/e.t*100}%`, background:C.dark, borderRadius:2 }} />
                </div>
                <button style={{ width:"100%", marginTop:10, padding:"9px", borderRadius:9, border:"none", background:C.dark, color:C.sf, fontSize:13, fontWeight:700, cursor:"pointer" }}>申し込む</button>
              </div>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <span style={{ fontSize:16, fontWeight:700, color:C.tx, fontFamily:"Georgia,serif" }}>Regional.</span>
            <span style={{ fontSize:12, color:C.txS }}>ショップ準備中</span>
          </div>
          <div style={{ background:C.dark, borderRadius:14, padding:"32px 20px", textAlign:"center", marginBottom:8 }}>
            <div style={{ fontSize:32, marginBottom:12 }}>️</div>
            <div style={{ fontSize:16, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", marginBottom:8 }}>Coming Soon…</div>
            <div style={{ fontSize:11, color:"rgba(213,212,146,0.7)", lineHeight:1.7 }}>
              Regional. オリジナルアパレル・グッズを<br/>準備中です。お楽しみに。
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(213,212,146,0.1)", borderRadius:20, padding:"6px 14px", marginTop:14 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:C.brand, animation:"pulse 1.5s ease-in-out infinite" }}/>
              <span style={{ fontSize:10, fontWeight:700, color:C.brand }}>準備中</span>
            </div>
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
        </div>
      </div>
    </div>
  );
}

/* ══ EventLab ══ */
function EventLab({ userProfile, currentPlan }) {
  const canShowAvatar = ["el","elpro","rl","admin"].includes(currentPlan);

  /* ユーザーアバター表示コンポーネント（インライン） */
  const userAvt = (size=42, isMe=false) => {
    if (isMe && canShowAvatar && userProfile?.avatar) {
      return <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",flexShrink:0}}><img src={userProfile.avatar} alt="av" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>;
    }
    const lbl = isMe ? (userProfile?.name?.[0] || "U") : "?";
    return <div style={{width:size,height:size,borderRadius:"50%",background:isMe?C.dark:C.sfOl,display:"flex",alignItems:"center",justifyContent:"center",color:isMe?C.brand:C.txS,fontWeight:700,fontSize:size*0.35,flexShrink:0}}>{lbl}</div>;
  };
  const [tab, setTab] = useState("feed");

  // 投稿データ（コメント配列付き）
  const [posts, setPosts] = useState([
    { id:1, u:"木寺 蒼真", h:"kidera_soma", av:"K", time:"2時間前",
      c:"【地方創生ビジネスコンテストin多賀城】参加者募集開始\n宮城県多賀城市を舞台に、地域課題に向き合う事業プランを競います。学生・社会人どなたでも参加OK！",
      lk:24, rp:5, img:null, tag:"イベント",
      comments:[
        { id:101, u:"中原 光輝", av:"N", time:"1時間前", text:"楽しみにしてます！参加します" },
        { id:102, u:"渡邉 輝",   av:"W", time:"45分前",  text:"告知ありがとうございます！シェアしました" },
      ]
    },
    { id:2, u:"峯 奏音", h:"mine_kanon", av:"M", time:"5時間前",
      c:"Re.Lab ビジネス研究所、4月からスタート\n前提基礎知識20項目、一緒に学んでいきましょう。まずは①マネジメント＆ファイナンスから！",
      lk:18, rp:3, img:null, tag:"Re.Lab",
      comments:[
        { id:201, u:"木寺 蒼真", av:"K", time:"4時間前", text:"コンテンツの質、本当に高いと思う。みんなに届けたい" },
      ]
    },
    { id:3, u:"渡邉 輝", h:"watanabe_hikaru", av:"W", time:"1日前",
      c:"VECTORプログラム参加者募集中↯\n東京都開催。地方創生×キャリア構築を本気で考える人、集まれ。定員30名なので早めに！",
      lk:41, rp:9, img:null, tag:"教育",
      comments:[]
    },
    { id:4, u:"中原 光輝", h:"nakahara_koki", av:"N", time:"2日前",
      c:"南魚沼の魅力、改めて伝えていきたい\n雪・農業・温泉・自然。地方にしかない価値がある。Regional Labはそれをお洒落に、上質に届ける組織でありたい。",
      lk:55, rp:12, img:null, tag:"想い",
      comments:[
        { id:401, u:"峯 奏音",   av:"M", time:"1日前", text:"この想い、すごく好きです。一緒に体現していきましょう！" },
        { id:402, u:"渡邉 輝",   av:"W", time:"1日前", text:"Regional Labに関わって本当によかったと思える言葉です" },
      ]
    },
  ]);

  // いいね・リポスト・コメント開閉
  const [liked,    setLiked]    = useState({});
  const [reposted, setReposted] = useState({});
  const [openCm,   setOpenCm]   = useState({}); // { postId: bool }
  const [cmInput,  setCmInput]  = useState({}); // { postId: string }

  // 新規投稿
  const [newPost,  setNewPost]  = useState("");
  const [newTag,   setNewTag]   = useState("投稿");

  // 個別チャット
  const [chatTarget, setChatTarget] = useState(null);
  const [dmLogs,     setDmLogs]     = useState({});
  const [dmInput,    setDmInput]    = useState("");

  const TAGS = ["投稿","イベント","想い","質問","告知","Re.Lab","教育"];

  /* 投稿する */
  function handlePost() {
    const t = newPost.trim();
    if (!t) return;
    setPosts(prev => [{
      id: Date.now(),
      u:userProfile?.name||"あなた", h:"you", av:userProfile?.name?.[0]||"U", isMe:true,
      time:"たった今",
      c: t, lk:0, rp:0, img:null,
      tag: newTag,
      comments:[],
    }, ...prev]);
    setNewPost("");
    setNewTag("投稿");
  }

  /* いいね */
  function toggleLike(id) {
    setLiked(v => ({ ...v, [id]: !v[id] }));
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, lk: v => v + (liked[id] ? -1 : 1) } : p
    ));
  }

  /* リポスト */
  function toggleRepost(id) {
    setReposted(v => ({ ...v, [id]: !v[id] }));
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, rp: p.rp + (reposted[id] ? -1 : 1) } : p
    ));
  }

  /* コメント送信 */
  function sendComment(postId) {
    const t = (cmInput[postId] || "").trim();
    if (!t) return;
    setPosts(prev => prev.map(p =>
      p.id === postId ? {
        ...p,
        comments: [...p.comments, {
          id: Date.now(), u:"あなた", av:"U",
          time:"たった今", text: t,
        }],
      } : p
    ));
    setCmInput(v => ({ ...v, [postId]: "" }));
  }

  /* DM送信 */
  function sendDm() {
    const t = dmInput.trim();
    if (!t || !chatTarget) return;
    const key = chatTarget.name;
    setDmLogs(prev => ({ ...prev, [key]: [...(prev[key]||[]), {
      id: Date.now(), text: t, isMine: true,
      time: new Date().toLocaleTimeString("ja-JP", {hour:"2-digit", minute:"2-digit"}),
    }]}));
    setDmInput("");
  }

  /* ── 個別チャット画面 ── */
  if (chatTarget) {
    const key  = chatTarget.name;
    const msgs = dmLogs[key] || [];
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)", background:C.sf, borderRadius:14, border:`1px solid ${C.bd}`, overflow:"hidden" }}>
        <div style={{ flexShrink:0, height:54, display:"flex", alignItems:"center", gap:10, padding:"0 16px", borderBottom:`1px solid ${C.bd}` }}>
          <button onClick={()=>setChatTarget(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={20} c={C.tx} /></button>
          <div style={{ width:34, height:34, borderRadius:"50%", background:C.brand, display:"flex", alignItems:"center", justifyContent:"center", color:C.dark, fontWeight:700, fontSize:13, flexShrink:0 }}>{chatTarget.av}</div>
          <div><div style={{ fontSize:13, fontWeight:700, color:C.tx }}>{chatTarget.name}</div><div style={{ fontSize:10, color:C.txS }}>{chatTarget.role}</div></div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
          {msgs.length === 0 && (
            <div style={{ textAlign:"center", padding:"40px 0", color:C.txS }}>
              <div style={{ fontSize:28, marginBottom:8 }}>›</div>
              <div style={{ fontSize:12 }}>{chatTarget.name} さんへメッセージを送ろう</div>
            </div>
          )}
          {msgs.map(m => (
            <div key={m.id} style={{ display:"flex", flexDirection:m.isMine?"row-reverse":"row", gap:8, marginBottom:12, alignItems:"flex-end" }}>
              <div style={{ maxWidth:"72%" }}>
                <div style={{ background:m.isMine?C.dark:C.sfOl, borderRadius:m.isMine?"14px 14px 4px 14px":"14px 14px 14px 4px", padding:"9px 12px" }}>
                  <div style={{ fontSize:12, color:m.isMine?C.sf:C.tx, lineHeight:1.5 }}>{m.text}</div>
                </div>
                <div style={{ fontSize:9, color:C.txS, marginTop:3, textAlign:m.isMine?"right":"left" }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flexShrink:0, borderTop:`1px solid ${C.bd}`, padding:"10px 14px", display:"flex", gap:8, alignItems:"flex-end" }}>
          <textarea value={dmInput} onChange={e=>setDmInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendDm(); }}}
            placeholder={`${chatTarget.name} さんへ…`} rows={1}
            style={{ flex:1, borderRadius:20, border:`1px solid ${C.bd}`, padding:"9px 14px", fontSize:12, color:C.tx, background:C.sfOl, resize:"none", fontFamily:"inherit", outline:"none" }} />
          <button onClick={sendDm} style={{ width:36, height:36, borderRadius:"50%", border:"none", background:dmInput.trim()?C.dark:C.bdL, cursor:dmInput.trim()?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={dmInput.trim()?C.brand:C.txS} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:680, margin:"0 auto" }}>

      {/* ── ヘッダー＋タブ ── */}
      <div style={{ background:C.sf, borderRadius:14, border:`1px solid ${C.bd}`, marginBottom:16, overflow:"hidden" }}>
        <div style={{ padding:"16px 20px 0" }}>
          <div style={{ fontSize:20, fontWeight:800, color:C.tx, fontFamily:"Georgia,serif", marginBottom:12 }}>Event Lab</div>
        </div>
        <div style={{ display:"flex", borderTop:`1px solid ${C.bdL}` }}>
          {[["feed"," フィード"],["members","— メンバー"]].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ flex:1, padding:"12px 0", border:"none", background:"none", cursor:"pointer", fontSize:13, fontWeight:700, color:tab===k?C.dark:C.txS, borderBottom:tab===k?`2px solid ${C.dark}`:"2px solid transparent" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── フィード ── */}
      {tab === "feed" && (
        <div>
          {/* 投稿ボックス */}
          <div style={{ background:C.sf, borderRadius:14, border:`1px solid ${C.bd}`, padding:"16px 20px", marginBottom:16 }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              {userAvt(42,true)}
              <div style={{ flex:1 }}>
                <textarea
                  value={newPost}
                  onChange={e=>setNewPost(e.target.value)}
                  placeholder="いまどうしてる？自由に投稿しよう！"
                  rows={3}
                  style={{ width:"100%", border:"none", borderBottom:`1.5px solid ${newPost?C.dark:C.bdL}`, padding:"4px 0 8px", fontSize:14, color:C.tx, background:"none", resize:"none", fontFamily:"inherit", outline:"none", lineHeight:1.6, boxSizing:"border-box" }}
                />
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10 }}>
                  {/* タグ選択 */}
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {TAGS.map(tg => (
                      <button key={tg} onClick={()=>setNewTag(tg)} style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, border:`1.5px solid ${newTag===tg?C.dark:C.bdL}`, background:newTag===tg?C.dark:"none", color:newTag===tg?C.brand:C.txS, cursor:"pointer" }}>{tg}</button>
                    ))}
                  </div>
                  <button onClick={handlePost} disabled={!newPost.trim()}
                    style={{ padding:"9px 22px", borderRadius:20, border:"none", background:newPost.trim()?C.dark:"#C0C8A0", color:newPost.trim()?C.brand:"#999", fontSize:13, fontWeight:700, cursor:newPost.trim()?"pointer":"default", flexShrink:0 }}>
                    投稿する
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 投稿一覧 */}
          {posts.map(p => (
            <div key={p.id} style={{ background:C.sf, borderRadius:14, border:`1px solid ${C.bd}`, marginBottom:12, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px 12px" }}>
                {/* ユーザー情報 */}
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <Av l={p.av} sz={42} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2, flexWrap:"wrap" }}>
                      <span style={{ fontSize:14, fontWeight:700, color:C.tx }}>{p.u}</span>
                      <span style={{ fontSize:11, color:C.txS }}>@{p.h}</span>
                      <span style={{ fontSize:11, color:C.txS }}>·</span>
                      <span style={{ fontSize:11, color:C.txS }}>{p.time}</span>
                      <span style={{ fontSize:10, fontWeight:700, color:C.dark, background:C.sfOl, borderRadius:10, padding:"2px 8px" }}>{p.tag}</span>
                    </div>
                    {/* 本文 */}
                    <div style={{ fontSize:14, color:C.tx, lineHeight:1.7, whiteSpace:"pre-line", marginTop:6 }}>{p.c}</div>
                  </div>
                </div>

                {/* アクションバー */}
                <div style={{ display:"flex", gap:0, marginTop:14, paddingTop:12, borderTop:`1px solid ${C.bdL}` }}>
                  {/* コメント */}
                  <button onClick={()=>setOpenCm(v=>({...v,[p.id]:!v[p.id]}))}
                    style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", color:openCm[p.id]?C.dark:C.txS, fontSize:13, padding:"4px 14px 4px 0" }}>
                    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    {p.comments.length > 0 && <span style={{ fontSize:12 }}>{p.comments.length}</span>}
                  </button>
                  {/* リポスト */}
                  <button onClick={()=>toggleRepost(p.id)}
                    style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", color:reposted[p.id]?"#3A9A3A":C.txS, fontSize:13, padding:"4px 14px 4px 0" }}>
                    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                    {p.rp + (reposted[p.id] ? 1 : 0) > 0 && <span style={{ fontSize:12 }}>{p.rp + (reposted[p.id] ? 1 : 0)}</span>}
                  </button>
                  {/* いいね */}
                  <button onClick={()=>toggleLike(p.id)}
                    style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", color:liked[p.id]?C.red:C.txS, fontSize:13, padding:"4px 14px 4px 0" }}>
                    <svg width={17} height={17} viewBox="0 0 24 24" fill={liked[p.id]?C.red:"none"} stroke={liked[p.id]?C.red:"currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span style={{ fontSize:12 }}>{p.lk + (liked[p.id] ? 1 : 0)}</span>
                  </button>
                </div>
              </div>

              {/* コメントセクション */}
              {openCm[p.id] && (
                <div style={{ background:C.sfOl, borderTop:`1px solid ${C.bdL}` }}>
                  {/* 既存コメント */}
                  {p.comments.map(cm => (
                    <div key={cm.id} style={{ display:"flex", gap:10, padding:"12px 20px", borderBottom:`1px solid ${C.bdL}` }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:C.brand, display:"flex", alignItems:"center", justifyContent:"center", color:C.dark, fontWeight:700, fontSize:11, flexShrink:0 }}>{cm.av}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", gap:6, alignItems:"baseline", marginBottom:3 }}>
                          <span style={{ fontSize:12, fontWeight:700, color:C.tx }}>{cm.u}</span>
                          <span style={{ fontSize:10, color:C.txS }}>{cm.time}</span>
                        </div>
                        <div style={{ fontSize:12, color:C.tx, lineHeight:1.6 }}>{cm.text}</div>
                      </div>
                    </div>
                  ))}
                  {/* コメント入力 */}
                  <div style={{ display:"flex", gap:10, padding:"12px 20px", alignItems:"flex-end" }}>
                    {userAvt(30,true)}
                    <div style={{ flex:1, display:"flex", gap:8, alignItems:"flex-end" }}>
                      <textarea
                        value={cmInput[p.id]||""}
                        onChange={e=>setCmInput(v=>({...v,[p.id]:e.target.value}))}
                        onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendComment(p.id); }}}
                        placeholder="コメントする…"
                        rows={1}
                        style={{ flex:1, borderRadius:20, border:`1px solid ${C.bd}`, padding:"8px 14px", fontSize:12, color:C.tx, background:C.sf, resize:"none", fontFamily:"inherit", outline:"none", lineHeight:1.4 }}
                      />
                      <button onClick={()=>sendComment(p.id)} disabled={!(cmInput[p.id]||"").trim()}
                        style={{ width:34, height:34, borderRadius:"50%", border:"none", background:(cmInput[p.id]||"").trim()?C.dark:C.bdL, cursor:(cmInput[p.id]||"").trim()?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={(cmInput[p.id]||"").trim()?C.brand:C.txS} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── メンバー ── */}
      {tab === "members" && (
        <div style={{ background:C.sf, borderRadius:14, border:`1px solid ${C.bd}`, overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", fontSize:12, color:C.txS, borderBottom:`1px solid ${C.bdL}` }}>{ELM.length} members</div>
          {ELM.map((m,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 20px", borderBottom: i<ELM.length-1?`1px solid ${C.bdL}`:"none" }}>
              <Av l={m.av} sz={46} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.tx, marginBottom:2 }}>{m.name}</div>
                <div style={{ fontSize:11, color:C.txS, marginBottom: m.bio?3:0 }}>{m.role}{m.since?` · ${m.since}`:""}</div>
                {m.bio && <div style={{ fontSize:11, color:C.txM }}>{m.bio}</div>}
              </div>
              <button onClick={()=>setChatTarget(m)}
                style={{ padding:"7px 16px", borderRadius:20, border:`1.5px solid ${C.bd}`, background:"none", color:C.dark, fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:5, flexShrink:0, whiteSpace:"nowrap" }}>
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                DM
                {dmLogs[m.name]?.length > 0 && <span style={{ background:C.dark, color:C.brand, fontSize:9, fontWeight:700, borderRadius:10, padding:"1px 5px" }}>{dmLogs[m.name].length}</span>}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


/* ══ 各項目リッチコンテンツ ══ */


/* ══ 前提基礎知識コンテンツ ══ */
function LessonContent({ idx }) {
  const S = {
    dk:"#113009",br:"#D5D492",sf:"#fff",bg:"#F7F8F2",bd:"#E2E6D0",
    tx:"#0E2808",ts:"#3A5030",tg:"#6A8060"
  };

  /* 純粋なデータ返し関数（JSXなし、React要素なし） */
  const themeTitle = (t) => t;

  /* スタイル定数 */
  const rowStyle = (last) => ({display:"flex",gap:14,paddingBottom:last?0:14,marginBottom:last?0:14,borderBottom:last?"none":"1px solid "+S.bd});
  const stepRowStyle = (i,len) => ({display:"flex",gap:12,paddingBottom:i<len-1?14:0,marginBottom:i<len-1?14:0,borderBottom:i<len-1?"1px solid "+S.bd:"none"});

  /* ①〜⑳ 各コンテンツ */
  const contents = {
    0: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>人生のあらゆる場面で使える、4つの必須スキル</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>4つの必須スキル</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            {[["マネジメント","組織・自分・家族を動かす力。全ての選択肢で前提条件。"],["ファイナンス","予算がわからなければ何も実現不可能。人生の全場面で必須。"],["マーケティング","まず自身を分析せよ。ビジョンも目標もここから始まる。"],["プロモーション","見せ方・見られ方の技術。ブランディングで付加価値を生む。"]].map(([t,d],i)=>(
              <div key={i} style={{background:S.bg,borderRadius:10,padding:"14px 12px",border:"1px solid "+S.bd}}>
                <div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:4}}>{t}</div>
                <div style={{fontSize:10,color:S.ts,lineHeight:1.5}}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:"3px solid "+S.dk,paddingLeft:14}}>
            <div style={{fontSize:12,color:S.ts,lineHeight:1.8}}>4つを一人でこなせる状態が、人生のあらゆる場面でレバレッジを効かせられる状態である。</div>
          </div>
        </div>
        <div style={{background:S.bg,borderRadius:10,padding:"14px 16px",marginBottom:14,borderLeft:"2px solid "+S.bd}}>
          <div style={{fontSize:12,color:S.ts,lineHeight:1.9,fontStyle:"italic"}}>「夢なき者に理想なし。理想なき者に計画なし。計画なき者に実行なし。実行なき者に成功なし。故に、夢なき者に成功なし。」― 吉田松陰</div>
        </div>
      </div>
    ),
    1: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>人生軸もビジネスも、この交差点から生まれる</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>3つの要素</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
            {[["ウォンツ","やりたいこと"],["キャン","できること"],["ニーズ","社会の需要"]].map(([t,d],i)=>(
              <div key={i} style={{background:S.bg,borderRadius:10,padding:"12px 8px",textAlign:"center",border:"1px solid "+S.bd}}>
                <div style={{fontSize:11,fontWeight:700,color:S.tx,marginBottom:3}}>{t}</div>
                <div style={{fontSize:9,color:S.tg,lineHeight:1.4}}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{background:S.dk,borderRadius:10,padding:"12px 16px",textAlign:"center",marginBottom:14}}>
            <div style={{fontSize:10,color:"rgba(213,212,146,0.5)",marginBottom:4}}>3つ全ての交差点</div>
            <div style={{fontSize:13,fontWeight:800,color:S.br}}>あなたの人生軸 ＆ ビジネスターゲット</div>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>単独では何が起きるか</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["状態","問題"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["ウォンツのみ","できないので意味がない"],["キャンのみ","やりたくないので無駄な時間"],["ウォンツ＋キャン","需要なし → 孤独で実らない"],["3つ全て","人生軸・ターゲット確定"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>
                  {r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<3?"1px solid "+S.bd:"none"}}>{c}</td>)}
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    2: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>強みは考えるものではなく、行動した結果として浮き出るもの</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>強みの2段階定義</div>
          <div style={{borderRadius:10,overflow:"hidden",marginBottom:14,border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["種類","定義"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["表面的な強み","できること（キャン）"],["本来の強み","できること × やりたいこと"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<1?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>強みを見つける4ステップ</div>
          {[["1","好きなことを経験しまくる","とにかく量をこなす"],["2","未経験にも挑戦する","多角的な視点を得る"],["3","振り返る","できること × やりたいこと ＝ 本来の強み"],["4","不の要素を把握","不満・不可能・不自由 ＝ 弱み"]].map(([n,t,d],i,arr)=>(
            <div key={i} style={{display:"flex",gap:12,paddingBottom:i<arr.length-1?14:0,marginBottom:i<arr.length-1?14:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:S.dk,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{fontSize:10,fontWeight:800,color:S.br}}>{n}</span></div>
              <div><div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:3}}>{t}</div><div style={{fontSize:11,color:S.ts,lineHeight:1.6}}>{d}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>ビジネス事例 — Apple vs SONY</div>
          <div style={{borderRadius:10,overflow:"hidden",marginBottom:12,border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["企業","強み","弱み"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["Apple","先見性・革新性・クール","アナログ質を求める層"],["SONY","電化製品の質・音質・カメラ","先見性・革新性・クール"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<1?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          <div style={{borderLeft:"3px solid "+S.dk,paddingLeft:14}}><div style={{fontSize:12,color:S.ts,lineHeight:1.8}}>SONYはAppleとの競争で負けた市場ではなく、アナログ的質という別市場で強みを発揮した。弱みの裏に次の市場がある。</div></div>
        </div>
      </div>
    ),
    3: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>この4つさえ抑えれば、コミュニティ形成も個の確立も容易</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          {[["◆","理念","墓場まで持っていく不変の軸。判断に迷った時の最強のお守り。"],["◉","ミッション","掲げる大きな夢。抽象的な大きな的でOK。"],["→","ビジョン","現状↔ミッションのギャップを埋める逆算ロードマップ。"],["✦","カラー","ブランディングであり風土。細部を調整してこそ美が生まれる。"]].map(([ic,lb,dc],i,arr)=>(
            <div key={i} style={{display:"flex",gap:14,paddingBottom:i<arr.length-1?14:0,marginBottom:i<arr.length-1?14:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:36,height:36,borderRadius:10,background:S.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,border:"1px solid "+S.bd}}>{ic}</div>
              <div><div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:3}}>{lb}</div><div style={{fontSize:11,color:S.ts,lineHeight:1.6}}>{dc}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>連鎖構造</div>
          {[["◉ ミッション","大きな夢（抽象・遠い未来）","#113009","#D5D492"],["→ ビジョン","逆算ロードマップ（解像度↑）","#3D6030","#fff"],["◆ 理念","不変の判断軸（常時支える）","#5F7753","#fff"],["✦ カラー","ブランド・風土（外部への表現）","#90A982","#113009"]].map(([t,d,bg2,tc],i)=>(
            <div key={i} style={{background:bg2,borderRadius:9,padding:"10px 14px",marginBottom:4}}>
              <div style={{fontSize:11,fontWeight:700,color:tc}}>{t}</div>
              <div style={{fontSize:9,color:bg2==="#113009"?"rgba(213,212,146,0.6)":"rgba(255,255,255,0.6)",marginTop:2}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    4: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>このプロセスを呼吸のように脳裏で行えば、自立していく</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>5ステップ・サイクル</div>
          {[["1","仮説","まず仮説を立てる。断定せず問いを持つ"],["2","検証","実際に試す・データを集める"],["3","問題","何が起きているかを明確にする"],["4","原因","なぜ起きているかを深く掘り下げる"],["5","解決","原因に対して具体的な打ち手を実行"]].map(([n,t,d],i,arr)=>(
            <div key={i} style={{display:"flex",gap:12,paddingBottom:i<arr.length-1?14:0,marginBottom:i<arr.length-1?14:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:S.dk,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{fontSize:10,fontWeight:800,color:S.br}}>{n}</span></div>
              <div><div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:3}}>{t}</div><div style={{fontSize:11,color:S.ts,lineHeight:1.6}}>{d}</div></div>
            </div>
          ))}
          <div style={{borderLeft:"3px solid "+S.dk,paddingLeft:14,marginTop:14}}><div style={{fontSize:12,color:S.ts,lineHeight:1.8}}>このサイクル＝マーケティング。プロセスから高みを目指そう。</div></div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>おすすめコンテンツ</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["媒体","コンテンツ"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["YouTube","ディスカバリーCH 覆面ビリオネア"],["YouTube","サムの本解説ch"],["映画","The Social Network（2010）"],["TV","カンブリア宮殿：SHONAI 山中大介"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<3?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    5: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>一番重要なのはお金ではなく、信頼構築である</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>フロントエンド 8割 ／ バックエンド 2割</div>
          <div style={{display:"grid",gridTemplateColumns:"8fr 2fr",gap:8,marginBottom:14}}>
            <div style={{background:"#3D6030",borderRadius:10,padding:"14px",textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.65)",marginBottom:4}}>フロントエンド</div>
              <div style={{fontSize:24,fontWeight:900,color:"#fff"}}>8割</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.5)",marginTop:3}}>信頼構築・集客</div>
            </div>
            <div style={{background:S.dk,borderRadius:10,padding:"14px",textAlign:"center"}}>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(213,212,146,0.6)",marginBottom:4}}>バック</div>
              <div style={{fontSize:20,fontWeight:900,color:S.br}}>2割</div>
              <div style={{fontSize:8,color:"rgba(213,212,146,0.4)",marginTop:3}}>収益化</div>
            </div>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>業界別具体例</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["業界","フロント","バック"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["コミュニティ","イベント参加","コミュニティ参加"],["通販","お試し価格","定期購入"],["サブスク","お試し期間","定期購入"],["動画","切り抜き","本編"],["アプリゲーム","無課金","課金"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<4?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    6: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>アップセルで「より上へ」、クロスセルで「横に広げる」</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            {[["↑","アップセル","上位・高価格な商品へ誘導","顧客単価の向上"],["↔","クロスセル","関連する別の商品を追加購入","購入点数の増加"]].map(([ic,t,d,sub],i)=>(
              <div key={i} style={{background:S.bg,borderRadius:10,padding:"16px 12px",textAlign:"center",border:"1px solid "+S.bd}}>
                <div style={{fontSize:22,marginBottom:8,fontWeight:300,letterSpacing:"-0.02em",color:"#113009",lineHeight:1}}>{ic}</div>
                <div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:6}}>{t}</div>
                <div style={{fontSize:10,color:S.ts,lineHeight:1.5,marginBottom:8}}>{d}</div>
                <div style={{fontSize:9,color:S.tg,background:"#EEF0D5",borderRadius:5,padding:"3px 8px",display:"inline-block"}}>{sub}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>業界別具体例</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["業界","アップセル","クロスセル"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["スマートフォン","スタンダード→プレミアム","ケース・フィルム"],["ハンバーガー","S→M or L","ポテト・ドリンク"],["ホテル","客室グレードアップ","旅行保険・レンタカー"],["英会話","月4回→月8回","TOEIC対策テキスト"],["クレカ","スタンダード→ゴールド","証券口座開設"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<4?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    7: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>結果の8割は、原因の2割から生まれる</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>20：80 の法則</div>
          <div style={{marginBottom:14}}>
            {[["重要な2割（原因）","20%","#113009","#D5D492"],["残り8割（結果）","80%","#5F7753","#fff"]].map(([l,p,bg2,tc])=>(
              <div key={l} style={{marginBottom:6}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:10,color:S.ts}}>{l}</span>
                  <span style={{fontSize:10,fontWeight:700,color:S.tx}}>{p}</span>
                </div>
                <div style={{height:8,background:bg2,borderRadius:4,width:p}}/>
              </div>
            ))}
          </div>
          <div style={{borderLeft:"3px solid "+S.dk,paddingLeft:14,marginBottom:14}}><div style={{fontSize:12,color:S.ts,lineHeight:1.8}}>重要な2割にリソースを集中させることで、8割の成果を効率的に創出できる</div></div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>VIPビジネス 4事例</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["業界","2割（VIP）","支える仕組み"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["ベガス","富裕層カジノ客","一般客の宿泊を低価格化"],["旅客機","ビジネス客","エコノミー席を低価格化"],["寿司屋","お酒の注文客","刺身を赤字覚悟で提供"],["アプリ","課金ユーザー","無課金ユーザーを維持"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<3?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    8: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>三段目まで辿り着いた者だけが、本質的な解決ができる</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>課題の三段層</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {[["1","顕在的な課題","誰でも見えている課題。解決者が既にいるのに解決されていない。","#EEF0D5","#0E2808"],["2","潜在的な課題","顕在課題の背後に隠れた要因・障壁。仮説段階。","#D4ECC8","#113009"],["3","深層課題（本質）","心理的要因まで突き詰めた最終地。ここを捉えれば効果が莫大。","#113009","#D5D492"]].map(([n,t,d,bg2,tc])=>(
              <div key={n} style={{background:bg2,borderRadius:10,padding:"14px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{width:18,height:18,borderRadius:"50%",background:"rgba(17,48,9,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:9,fontWeight:800,color:tc}}>{n}</span></div>
                  <span style={{fontSize:12,fontWeight:700,color:tc}}>{t}</span>
                </div>
                <div style={{fontSize:10,color:bg2==="#113009"?"rgba(213,212,146,0.65)":"#6A8060",lineHeight:1.6,paddingLeft:26}}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#FFFBEE",borderRadius:9,padding:"10px 14px",border:"1px solid #F0E090"}}>
            <div style={{fontSize:10,color:"#806000",lineHeight:1.6}}>解決したのに効果が今一なのは、三段目まで捉えられていないから。</div>
          </div>
        </div>
      </div>
    ),
    9: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>リスクを最小限に、挑戦を最大限に</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>博打 vs 挑戦</div>
          <div style={{borderRadius:10,overflow:"hidden",marginBottom:14,border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["","特徴"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["× 博打","一度失敗するとそこで終わり"],["· 挑戦","何度でも立ち上がれる状況を維持"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<1?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
            <div style={{background:"#FFF5F5",borderRadius:10,padding:"14px",textAlign:"center",border:"1px solid #FFD5D5"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#C04040",marginBottom:6}}>1事業集中</div>
              <div style={{fontSize:22,fontWeight:900,color:S.tx}}>1億円</div>
              <div style={{fontSize:9,color:S.tg,marginTop:4}}>高リスク</div>
            </div>
            <div style={{background:"#F0FFF5",borderRadius:10,padding:"14px",textAlign:"center",border:"1px solid #C0ECC0"}}>
              <div style={{fontSize:11,fontWeight:700,color:S.dk,marginBottom:6}}>4事業分散</div>
              <div style={{fontSize:16,fontWeight:800,color:S.dk}}>2,500万×4</div>
              <div style={{fontSize:9,color:S.tg,marginTop:4}}>低リスク</div>
            </div>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>挑戦の理想形 3ステップ</div>
          {[["1","安定収入源の確保","月10〜15万以上。精神的安定と博打からの脱却"],["2","投資で将来資金を形成","積立NISA等で長期的な資金環境を整える"],["3","本来の挑戦へ投入","時間・資金を本命の挑戦に集中投下"]].map(([n,t,d],i,arr)=>(
            <div key={i} style={{display:"flex",gap:12,paddingBottom:i<arr.length-1?14:0,marginBottom:i<arr.length-1?14:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:S.dk,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{fontSize:10,fontWeight:800,color:S.br}}>{n}</span></div>
              <div><div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:3}}>{t}</div><div style={{fontSize:11,color:S.ts,lineHeight:1.6}}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>
    ),
    10: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>FORMULA</div>
          <div style={{fontSize:20,fontWeight:900,color:S.br,fontFamily:"Georgia,serif"}}>売上 ＝ 単価 × 客数 × リピート数</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
            {[["¥","単価","1人あたりの購入金額"],["person","客数","来店・参加人数"],["↺","リピート","月の来訪回数"]].map(([ic,t,d],i)=>(
              <div key={i} style={{background:S.bg,borderRadius:10,padding:"12px 8px",textAlign:"center",border:"1px solid "+S.bd}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:22,marginBottom:6}}>
                  {ic==="person"
                    ? <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={S.dk} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>
                    : <span style={{fontSize:18,fontWeight:300}}>{ic}</span>
                  }
                </div>
                <div style={{fontSize:11,fontWeight:700,color:S.tx,marginBottom:3}}>{t}</div>
                <div style={{fontSize:9,color:S.tg,lineHeight:1.4}}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:"3px solid #3D6030",paddingLeft:14,marginBottom:14}}><div style={{fontSize:12,color:S.ts,lineHeight:1.8}}>リピート率7〜8割、月3回以上を見込めるラインが限界単価・限界客数の目安</div></div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>シミュレーション</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["単価","客数","リピート","月売上"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["¥1,000","30名","1回","¥30,000"],["¥2,000","150名","1回","¥300,000"],["¥5,000","30名","2回","¥300,000"],["¥10,000","50名","1回","¥500,000"],["¥15,000","34名","1回","¥510,000"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:S.ts,padding:"9px 12px",textAlign:"center",borderBottom:ri<4?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    11: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>ファイナンスが理解できているかで、マネタイズは何通りも練れる</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>売上高の内訳構造</div>
          <div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:14}}>
            {[["売上高","#113009","#D5D492",true],["　－ 売上原価","#3D6030","#fff",false],["＝ 売上総利益（粗利）","#5F7753","#fff",true],["　－ 販売管理費","#90A982","#113009",false],["＝ 営業利益（純利益）","#C0D8A0","#113009",true],["　± 営業外損益","#EEF0D5","#3A5030",false],["＝ 純利益（最終利益）","#113009","#D5D492",true]].map(([l,bg2,tc,bold],i)=>(
              <div key={i} style={{background:bg2,borderRadius:6,padding:"8px 12px"}}><span style={{fontSize:10,fontWeight:bold?700:400,color:tc}}>{l}</span></div>
            ))}
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>用語まとめ</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["用語","意味"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["売上原価","仕入れコスト（商品・材料費）"],["販売管理費","人件費・水道光熱費・会場費等"],["粗利","売上総利益＋販売管理費"],["純利益","本業から得た最終的な利益"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<3?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    12: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>企業の「体力（BS）」と「活動（PL）」を数字で読む</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>BS vs PL の違い</div>
          <div style={{borderRadius:10,overflow:"hidden",marginBottom:14,border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["項目","BS（貸借対照表）","PL（損益計算書）"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["別名","ストック","フロー"],["示すもの","財政状態（体力）","経営状態（活動）"],["時間軸","ある時点の残高","一定期間の流れ"],["構成","資産・負債・純資産","売上・費用・利益"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<3?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>BS の構造</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
            <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
              <div style={{background:"#3D6030",padding:"6px 10px",textAlign:"center"}}><span style={{fontSize:10,fontWeight:700,color:"#fff"}}>資産の部</span></div>
              {[["流動資産","現金・売掛金等"],["固定資産","建物・土地等"]].map(([t,d],i)=>(
                <div key={i} style={{padding:"8px 10px",borderBottom:"1px solid "+S.bd}}>
                  <div style={{fontSize:10,fontWeight:700,color:S.tx}}>{t}</div>
                  <div style={{fontSize:9,color:S.tg}}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
              <div style={{background:S.dk,padding:"6px 10px",textAlign:"center"}}><span style={{fontSize:10,fontWeight:700,color:S.br}}>負債＋純資産</span></div>
              {[["流動負債","支払手形等"],["固定負債","長期借入金"],["純資産","資本金・剰余金"]].map(([t,d],i)=>(
                <div key={i} style={{padding:"8px 10px",borderBottom:"1px solid "+S.bd}}>
                  <div style={{fontSize:10,fontWeight:700,color:S.tx}}>{t}</div>
                  <div style={{fontSize:9,color:S.tg}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>しまむら vs ユニクロ（FR）</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["指標","しまむら","ユニクロ FR"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["モデル","仕入れ販売","企画〜販売一貫"],["固定資産","多い（土地・建物）","少ない（テナント賃借）"],["原価率","約67%","約51%"],["特徴","持つ経営","持たざる経営"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<3?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    13: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>投資家が企業を判断する際の主要6指標</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{borderRadius:10,overflow:"hidden",marginBottom:14,border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["指標","内容","相場値","最良値"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["ROI","投資対利益率","10〜13%","15〜20%↑"],["ROA","総資産利益率","3〜5%","7%↑"],["ROE","自己資本利益率","8〜10%","15%↑"],["PER","株価収益率","15倍","15倍以下"],["PBR","株価純資産倍率","1.0倍","1.0倍以下"],["EBITDA","営業CF（税引前）","—","高いほど良"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<5?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>計算式まとめ</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["ROI","利益 ÷ 投下資本"],["ROA","利益 ÷ 総資産"],["ROE","純利益 ÷ 自己資本"],["PER","株価 ÷ 1株純利益"],["PBR","株価 ÷ 1株純資産"],["EBITDA","営業利益 ＋ 減価償却費"]].map(([t,f],i)=>(
              <div key={i} style={{background:S.bg,borderRadius:8,padding:"10px 12px",border:"1px solid "+S.bd}}>
                <div style={{fontSize:12,fontWeight:700,color:S.dk,marginBottom:3}}>{t}</div>
                <div style={{fontSize:10,color:S.ts}}>{f}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    14: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>組織を動かすには、ビジョンの可視化が必須</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
            {[["KGI","重要目標達成指標","最終ゴール","#113009","#D5D492"],["KPI","重要業績評価指標","中間目標","#3D6030","#fff"]].map(([t,d,sub,bg2,tc])=>(
              <div key={t} style={{background:bg2,borderRadius:12,padding:"16px",textAlign:"center"}}>
                <div style={{fontSize:14,fontWeight:800,color:tc,marginBottom:3}}>{t}</div>
                <div style={{fontSize:9,color:tc==="#D5D492"?"rgba(213,212,146,0.55)":"rgba(255,255,255,0.6)",marginBottom:6}}>{d}</div>
                <div style={{fontSize:11,fontWeight:700,color:tc}}>{sub}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>SMART の法則</div>
          {[["S","Specific","具体的であること"],["M","Measurable","測定可能であること"],["A","Achievable","達成可能であること"],["R","Relevant","ビジョンとの関連性"],["T","Time-bound","期限が明確であること"]].map(([l,e,d],i,arr)=>(
            <div key={l} style={{display:"flex",gap:10,alignItems:"center",paddingBottom:i<arr.length-1?10:0,marginBottom:i<arr.length-1?10:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:24,height:24,borderRadius:6,background:S.dk,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:10,fontWeight:800,color:S.br}}>{l}</span></div>
              <div><span style={{fontSize:11,fontWeight:700,color:S.tx}}>{e}</span><span style={{fontSize:10,color:S.ts}}> — {d}</span></div>
            </div>
          ))}
        </div>
      </div>
    ),
    15: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>FORMULA</div>
          <div style={{fontSize:15,fontWeight:900,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.6}}>認知度 × 希少性 × ( 独自性 ＋ 一貫性 )</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          {[["◎","認知度","多くの人に知られている状態。希少性×一貫性の上で拡大すれば価値が確立する。"],["◆","希少性","世の中に有限として存在。簡単に手に入らないから価値が生まれる（ゴールド・ダイヤの原理）。"],["∞","独自性＋一貫性","独自の世界観を一貫して保ち続ける。ルイ・ヴィトン・ロレックス・フェラーリが体現。"]].map(([ic,lb,dc],i,arr)=>(
            <div key={i} style={{display:"flex",gap:14,paddingBottom:i<arr.length-1?14:0,marginBottom:i<arr.length-1?14:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:36,height:36,borderRadius:10,background:S.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:300,letterSpacing:"-0.01em",flexShrink:0,border:"1px solid "+S.bd}}>{ic}</div>
              <div><div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:3}}>{lb}</div><div style={{fontSize:11,color:S.ts,lineHeight:1.6}}>{dc}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>構築ステップ</div>
          {[["1","自分を確立","理念・ミッション・ビジョン・カラーを定める"],["2","第一印象を設計","認知バイアスは容易には除れない。最初が全て"],["3","希少性を維持","誰でも持てる・なれるものはブランドにならない"],["4","認知を拡大","一貫性の上で認知が広がった時、ブランド確立"]].map(([n,t,d],i,arr)=>(
            <div key={i} style={{display:"flex",gap:12,paddingBottom:i<arr.length-1?14:0,marginBottom:i<arr.length-1?14:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:S.dk,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{fontSize:10,fontWeight:800,color:S.br}}>{n}</span></div>
              <div><div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:3}}>{t}</div><div style={{fontSize:11,color:S.ts,lineHeight:1.6}}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>
    ),
    16: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>一番のターゲットは、案外身近な人間である</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          {[["◈","自分がペルソナ","顧客目線で見た時、自分ならそのサービスを利用するか。自分は市場の一人間。"],["◑","マイノリティ vs マジョリティ","自分の意見・思考がどちら側かを常に認識。どちらかに寄せるためではなく、一情報として。"],["◎","身近な人がターゲット","全て身の回りで完結し得るのは説得力が一番あるから。実体験に基づく課題感が最強の共感を生む。"]].map(([ic,lb,dc],i,arr)=>(
            <div key={i} style={{display:"flex",gap:14,paddingBottom:i<arr.length-1?14:0,marginBottom:i<arr.length-1?14:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:36,height:36,borderRadius:10,background:S.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:300,letterSpacing:"-0.01em",flexShrink:0,border:"1px solid "+S.bd}}>{ic}</div>
              <div><div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:3}}>{lb}</div><div style={{fontSize:11,color:S.ts,lineHeight:1.6}}>{dc}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>情報民主化時代の格差</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            <div style={{background:"#F0FFF5",borderRadius:10,padding:"14px",border:"1px solid #C0ECC0"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#113009" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>
                <span style={{fontSize:11,fontWeight:700,color:S.dk}}>情報を得る人</span>
              </div>
              <div style={{fontSize:10,color:S.ts,lineHeight:1.7}}>スマートフォン1台で一流と同等の知識を手に入れられる時代。<br/>情報収集・判断・行動のサイクルが速く、市場で優位に立てる。</div>
            </div>
            <div style={{background:"#FFF5F5",borderRadius:10,padding:"14px",border:"1px solid #FFD5D5"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C04040" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
                <span style={{fontSize:11,fontWeight:700,color:"#C04040"}}>情報を得ない人</span>
              </div>
              <div style={{fontSize:10,color:S.ts,lineHeight:1.7}}>同じ環境・同じ時代にいても、情報格差が生まれる。<br/>気づかないうちに選択肢・収入・キャリアに差がつき始める。</div>
            </div>
          </div>
          <div style={{background:S.bg,borderRadius:9,padding:"10px 14px",border:"1px solid "+S.bd}}>
            <div style={{fontSize:10,color:S.ts,lineHeight:1.7}}>情報格差のある身近な人こそが、最も説得力を持って届けられるターゲットかもしれない。自分の実体験から生まれた課題感は、最強のペルソナになる。</div>
          </div>
        </div>
      </div>
    ),
    17: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>ベンチマーク → 優位性 → ポジショニングで市場で語れる存在へ</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          {[["1","ベンチマーク","目標となる他社・他者との差分を測る行為。現在地を相対的に知るための基準点。"],["2","優位性","競合が模倣できない自社固有の強み。価格・品質・スピード・関係性・ブランドなど。"],["3","ポジショニング","市場の中で自社がどの立ち位置を取るかを戦略的に決定する。"]].map(([n,t,d],i,arr)=>(
            <div key={i} style={{display:"flex",gap:12,paddingBottom:i<arr.length-1?14:0,marginBottom:i<arr.length-1?14:0,borderBottom:i<arr.length-1?"1px solid "+S.bd:"none"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:S.dk,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><span style={{fontSize:10,fontWeight:800,color:S.br}}>{n}</span></div>
              <div><div style={{fontSize:12,fontWeight:700,color:S.tx,marginBottom:3}}>{t}</div><div style={{fontSize:11,color:S.ts,lineHeight:1.6}}>{d}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>優位性の5軸</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["優位性","具体例"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["価格","競合より安く提供できる"],["品質","圧倒的なクオリティの高さ"],["スピード","納品・対応の速さ"],["関係性","強固なコミュニティ・信頼"],["ブランド","独自の世界観・認知度"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<4?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    18: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>全ての人に同時に届けようとすることは最大の失策</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>5つの層</div>
          <div style={{marginBottom:14}}>
            {[["イノベーター","2.5%","#113009","#D5D492","リスクを追わず最新を追う"],["アーリーアダプター","13.5%","#2A5820","#fff","情報感度高い・影響力大"],["アーリーマジョリティ","34%","#3D6030","#fff","比較的早い段階で受け入れる"],["レイトマジョリティ","34%","#90A982","#113009","周囲を見てから動く"],["ラガード","16%","#C0C8A0","#113009","最も保守的・変化を好まない"]].map(([t,p,bg2,tc,d])=>(
              <div key={t} style={{background:bg2,borderRadius:8,padding:"9px 14px",marginBottom:4,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:tc}}>{t}</div>
                  <div style={{fontSize:9,color:bg2==="#113009"?"rgba(213,212,146,0.55)":"rgba(255,255,255,0.55)",marginTop:2}}>{d}</div>
                </div>
                <div style={{fontSize:16,fontWeight:900,color:tc}}>{p}</div>
              </div>
            ))}
            <div style={{background:"#FFFBEE",borderRadius:8,padding:"9px 14px",border:"1px solid #F0E090",marginTop:8}}>
              <div style={{fontSize:10,color:"#806000"}}>キャズム：まず全体の16%（イノベーター＋アーリーアダプター）を熱狂させることが先決。</div>
            </div>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>集客・営業フェーズ設計</div>
          <div style={{borderRadius:10,overflow:"hidden",border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["フェーズ","手段の例"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["1. 認知","SNS発信・口コミ・イベント登壇"],["2. 興味・関心","コンテンツ発信・無料体験・LP"],["3. 比較・検討","実績・ベンチマーク優位性の提示"],["4. 購買・参加","期間限定・紹介制度・フロントエンド設計"],["5. リピート・紹介","コミュニティ・VIP設計・感動体験"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<4?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    19: (
      <div>
        <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
          <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
          <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>全ての学びの集大成。あなたが描く未来への意志を言語化したもの。</div>
        </div>
        <div style={{background:S.sf,borderRadius:12,padding:"18px",marginBottom:14,border:"1px solid "+S.bd}}>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>事業計画書の10項目</div>
          <div style={{borderRadius:10,overflow:"hidden",marginBottom:14,border:"1px solid "+S.bd}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr>{["記載項目","対応する章"].map((h,i)=><th key={i} style={{background:S.dk,color:S.br,fontSize:10,fontWeight:700,padding:"9px 12px",textAlign:i===0?"left":"center"}}>{h}</th>)}</tr></thead>
              <tbody>{[["理念・ミッション・ビジョン","②④⑩"],["市場・課題分析","②③⑤⑨⑰⑱"],["ターゲット・ペルソナ","⑤⑨⑰⑱⑲"],["競合・優位性・ポジショニング","③⑱"],["ビジネスモデル","⑥⑦⑧⑩⑫⑬"],["売上・収支計画（PL）","⑩⑪⑫⑬⑭⑮"],["KPI・KGI","④⑬⑮"],["集客・営業戦略","⑥⑰⑱⑲"],["ブランディング戦略","③④⑧⑯"],["資金計画","⑩⑪⑫⑬⑭"]].map((r,ri)=>(
                <tr key={ri} style={{background:ri%2===0?S.sf:S.bg}}>{r.map((c,ci)=><td key={ci} style={{fontSize:11,color:ci===0?S.tx:S.ts,padding:"9px 12px",textAlign:ci===0?"left":"center",borderBottom:ri<9?"1px solid "+S.bd:"none"}}>{c}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
          <div style={{fontSize:9,fontWeight:700,color:S.tg,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>本書 全体構成マップ</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["0. 導入","①〜⑤","人生軸・基礎概念","#3D6030"],["1. 序説","⑥〜⑩","ビジネス戦略基礎","#113009"],["2. 本説","⑪〜⑮","ファイナンス・KPI","#1E4820"],["3. 末説","⑯〜⑳","ブランド・事業計画","#0A2006"]].map(([s,r,d,bg2])=>(
              <div key={s} style={{background:bg2,borderRadius:10,padding:"12px"}}>
                <div style={{fontSize:9,color:"rgba(213,212,146,0.45)",marginBottom:2}}>{s}</div>
                <div style={{fontSize:13,fontWeight:700,color:S.br,marginBottom:3}}>{r}</div>
                <div style={{fontSize:9,color:"rgba(213,212,146,0.6)"}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:S.bg,borderRadius:10,padding:"14px 16px",borderLeft:"2px solid "+S.bd}}>
          <div style={{fontSize:12,color:S.ts,lineHeight:1.9,fontStyle:"italic"}}>「なぜ、あなたがやるのか」— この問いへの力強い回答がなければ人の心は動かない。知識は行動によってのみ、知見へと昇華される。さあ、動きはじめよう。</div>
        </div>
      </div>
    ),
  };

  const c = contents[idx];
  if (c) return c;

  /* ②以降は共通テンプレートで表示 */
  const THEMES = [
    "","","強みは考えるものではなく、行動した結果として浮き出るもの",
    "この4つさえ抑えれば、コミュニティ形成も個の確立も容易",
    "このプロセスを呼吸のように脳裏で行えば、自立していく",
    "一番重要なのはお金ではなく、信頼構築である",
    "アップセルで「より上へ」、クロスセルで「横に広げる」",
    "結果の8割は、原因の2割から生まれる",
    "三段目まで辿り着いた者だけが、本質的な解決ができる",
    "リスクを最小限に、挑戦を最大限に",
    "売上 ＝ 単価 × 客数 × リピート数",
    "ファイナンスが理解できているかで、マネタイズは何通りも練れる",
    "企業の「体力（BS）」と「活動（PL）」を数字で読む",
    "投資家が企業を判断する際の主要6指標",
    "組織を動かすには、ビジョンの可視化が必須",
    "認知度 × 希少性 × ( 独自性 ＋ 一貫性 )",
    "一番のターゲットは、案外身近な人間である",
    "ベンチマーク → 優位性 → ポジショニングで市場で語れる存在へ",
    "全ての人に同時に届けようとすることは最大の失策",
    "全ての学びの集大成。あなたが描く未来への意志を言語化したもの。",
  ];
  return (
    <div>
      <div style={{background:S.dk,borderRadius:12,padding:"18px",marginBottom:14}}>
        <div style={{fontSize:9,color:"rgba(213,212,146,0.5)",letterSpacing:"0.15em",marginBottom:8}}>THEME</div>
        <div style={{fontSize:16,fontWeight:800,color:S.br,fontFamily:"Georgia,serif",lineHeight:1.5}}>{THEMES[idx]||"コンテンツ準備中"}</div>
      </div>
      <div style={{background:S.sf,borderRadius:12,padding:"18px",border:"1px solid "+S.bd}}>
        <div style={{fontSize:13,color:S.tx,lineHeight:1.8}}>この項目のコンテンツは準備中です。</div>
      </div>
    </div>
  );
}

/* ══ 1on1予約 ヘルパー関数 ══ */
function toMins(hhmm) {
  const [h,m] = hhmm.split(":").map(Number);
  return h*60+m;
}
function fmtTime(mins) {
  const h = Math.floor(mins/60), m = mins%60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}
function dateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

/* Googleカレンダー取得済みデータ（2026-04-24 取得 / souma0615souma@gmail.com） */
const BUSY_BLOCKS = [
  {d:"2026-04-24",s:"10:30",e:"12:00"},{d:"2026-04-24",s:"12:50",e:"14:20"},{d:"2026-04-24",s:"17:00",e:"18:00"},{d:"2026-04-24",s:"20:00",e:"21:00"},{d:"2026-04-24",s:"23:00",e:"24:00"},
  {d:"2026-04-25",s:"08:15",e:"16:45"},{d:"2026-04-25",s:"19:00",e:"22:00"},
  {d:"2026-04-26",s:"10:00",e:"22:00"},
  {d:"2026-04-27",s:"10:30",e:"12:00"},{d:"2026-04-27",s:"13:30",e:"22:00"},
  {d:"2026-04-28",s:"10:30",e:"12:00"},{d:"2026-04-28",s:"12:50",e:"14:20"},{d:"2026-04-28",s:"17:00",e:"22:00"},{d:"2026-04-28",s:"23:00",e:"24:00"},
  {d:"2026-04-29",s:"08:50",e:"10:20"},{d:"2026-04-29",s:"22:00",e:"24:00"},
  {d:"2026-04-30",s:"10:30",e:"12:00"},{d:"2026-04-30",s:"14:30",e:"16:00"},{d:"2026-04-30",s:"16:10",e:"17:40"},{d:"2026-04-30",s:"19:00",e:"20:00"},
  {d:"2026-05-01",s:"10:30",e:"12:00"},{d:"2026-05-01",s:"12:50",e:"14:20"},{d:"2026-05-01",s:"23:00",e:"24:00"},
  {d:"2026-05-02",s:"08:15",e:"16:45"},
  {d:"2026-05-04",s:"13:30",e:"22:00"},
  {d:"2026-05-05",s:"13:30",e:"22:00"},{d:"2026-05-05",s:"23:00",e:"24:00"},
  {d:"2026-05-06",s:"22:00",e:"24:00"},
  {d:"2026-05-07",s:"08:15",e:"16:45"},
  {d:"2026-05-08",s:"10:30",e:"12:00"},{d:"2026-05-08",s:"12:50",e:"14:20"},{d:"2026-05-08",s:"23:00",e:"24:00"},
  {d:"2026-05-09",s:"08:15",e:"16:45"},{d:"2026-05-09",s:"18:00",e:"24:00"},
  {d:"2026-05-10",s:"08:00",e:"24:00"},
  {d:"2026-05-11",s:"08:00",e:"24:00"},
  {d:"2026-05-12",s:"10:30",e:"12:00"},{d:"2026-05-12",s:"12:50",e:"14:20"},{d:"2026-05-12",s:"17:00",e:"22:00"},{d:"2026-05-12",s:"23:00",e:"24:00"},
  {d:"2026-05-13",s:"08:50",e:"10:20"},{d:"2026-05-13",s:"22:00",e:"24:00"},
  {d:"2026-05-14",s:"10:30",e:"12:00"},{d:"2026-05-14",s:"14:30",e:"16:00"},{d:"2026-05-14",s:"16:10",e:"17:40"},
  {d:"2026-05-15",s:"10:30",e:"12:00"},{d:"2026-05-15",s:"12:50",e:"14:20"},{d:"2026-05-15",s:"23:00",e:"24:00"},
  {d:"2026-05-16",s:"07:00",e:"24:00"},
  {d:"2026-05-17",s:"00:00",e:"23:00"},
  {d:"2026-05-18",s:"10:30",e:"12:00"},{d:"2026-05-18",s:"13:30",e:"22:00"},
  {d:"2026-05-19",s:"10:30",e:"12:00"},{d:"2026-05-19",s:"12:50",e:"14:20"},{d:"2026-05-19",s:"17:00",e:"22:00"},{d:"2026-05-19",s:"23:00",e:"24:00"},
  {d:"2026-05-20",s:"08:50",e:"10:20"},{d:"2026-05-20",s:"22:00",e:"24:00"},
  {d:"2026-05-21",s:"10:30",e:"12:00"},{d:"2026-05-21",s:"14:30",e:"16:00"},{d:"2026-05-21",s:"16:10",e:"17:40"},
  {d:"2026-05-22",s:"10:30",e:"12:00"},{d:"2026-05-22",s:"12:50",e:"14:20"},{d:"2026-05-22",s:"23:00",e:"24:00"},
];

function getAvailableSlots(ds) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const target = new Date(ds);
  if (target <= today) return [];
  const BUFFER=60, SLOT=60, DAY_START=8*60, DAY_END=23*60;
  const busy = BUSY_BLOCKS.filter(b=>b.d===ds).map(b=>({s:toMins(b.s),e:Math.min(toMins(b.e),24*60)}));
  const slots=[];
  for(let t=DAY_START;t+SLOT<=DAY_END;t+=30){
    if(!busy.some(b=>(t+SLOT)>(b.s-BUFFER)&&t<(b.e+BUFFER))) slots.push(fmtTime(t));
  }
  return slots;
}

function OneOnOneBooking({ is1 }) {
  const todayBase = new Date(); // 常に今日の日付
  todayBase.setHours(0,0,0,0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name,   setName]   = useState("");
  const [affil,  setAffil]  = useState("");
  const [topic,  setTopic]  = useState("");
  const [status, setStatus] = useState("idle");
  const [weekOffset, setWeekOffset] = useState(0);

  const DAY_LABELS = ["日","月","火","水","木","金","土"];

  const days = Array.from({length:14}, (_,i) => {
    const d = new Date(todayBase);
    d.setDate(todayBase.getDate() + weekOffset*14 + i + 1); // 明日から14日分
    return d;
  });

  function dateLabel(d) {
    return `${d.getMonth()+1}/${d.getDate()}(${DAY_LABELS[d.getDay()]})`;
  }
  function toISO(dateObj, hhmm) {
    return `${dateStr(dateObj)}T${hhmm}:00+09:00`;
  }

  const slots = selectedDate ? getAvailableSlots(dateStr(selectedDate)) : [];

  async function handleSubmit() {
    if (!selectedDate || !selectedSlot || !name.trim() || status==="loading") return;
    setStatus("loading");
    const startISO  = toISO(selectedDate, selectedSlot);
    const endISO    = toISO(selectedDate, fmtTime(toMins(selectedSlot)+60));
    const dlabel    = dateLabel(selectedDate);
    const endSlot   = fmtTime(toMins(selectedSlot)+60);
    const sessionType = is1 ? "社長1on1" : "コーチング";
    const email = "souma0615souma@gmail.com";
    try {
      const [gmailRes, calRes] = await Promise.all([
        fetch("https://api.anthropic.com/v1/messages", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            model:"claude-sonnet-4-20250514", max_tokens:500,
            system:"GmailでメールをすぐにToolを使って送信してください。",
            messages:[{role:"user", content:`宛先: ${email}\n件名: 【${sessionType}予約】${dlabel} ${selectedSlot}〜${endSlot}\n本文:\n${sessionType}の予約リクエストが届きました。\n\n■ 日時: ${dlabel} ${selectedSlot}〜${endSlot}（60分）\n■ 氏名: ${name}\n■ 所属: ${affil||"未入力"}\n■ 相談内容: ${topic||"未入力"}\n\nRe.Labアプリより自動送信`}],
            mcp_servers:[{type:"url", url:"https://gmailmcp.googleapis.com/mcp/v1", name:"gmail-mcp"}]
          })
        }),
        fetch("https://api.anthropic.com/v1/messages", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            model:"claude-sonnet-4-20250514", max_tokens:500,
            system:"GoogleカレンダーにイベントをすぐにToolを使って作成してください。",
            messages:[{role:"user", content:`カレンダーID: souma0615souma@gmail.com\nタイトル: 【${sessionType}】${name} 様\n開始: ${startISO}\n終了: ${endISO}\n説明: 氏名: ${name} / 所属: ${affil||"未入力"} / 相談内容: ${topic||"未入力"}\nタイムゾーン: Asia/Tokyo`}],
            mcp_servers:[{type:"url", url:"https://calendarmcp.googleapis.com/mcp/v1", name:"google-calendar-mcp"}]
          })
        })
      ]);
      setStatus(gmailRes.ok && calRes.ok ? "done" : "error");
    } catch { setStatus("error"); }
  }

  /* ── 完了画面 ── */
  if (status==="done") return (
    <div style={{ padding:"8px 0" }}>
      <div style={{ background:C.dark, borderRadius:13, padding:"24px 20px", textAlign:"center", marginBottom:12 }}>
        <div style={{ fontSize:32, marginBottom:12 }}>·</div>
        <div style={{ fontSize:16, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", marginBottom:8 }}>予約完了！</div>
        <div style={{ fontSize:12, color:"rgba(213,212,146,0.8)", lineHeight:1.8 }}>
          {selectedDate && dateLabel(selectedDate)} {selectedSlot}〜{fmtTime(toMins(selectedSlot)+60)}<br/>の予約が確定しました。
        </div>
      </div>
      <div style={{ background:C.sf, borderRadius:12, padding:"14px", border:`1px solid ${C.bd}`, marginBottom:10 }}>
        {[["️ Gmail","予約確認メールを送信しました"],["— カレンダー","Googleカレンダーに自動登録されました"],["— 氏名",name],[" 所属",affil||"未入力"],["› 相談内容",topic||"未入力"]].map(([l,v])=>(
          <div key={l} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.dark, flexShrink:0, width:100 }}>{l}</div>
            <div style={{ fontSize:11, color:C.txM }}>{v}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>{setStatus("idle");setSelectedDate(null);setSelectedSlot(null);setName("");setAffil("");setTopic("");}}
        style={{ width:"100%", padding:"11px", borderRadius:10, border:`1px solid ${C.bd}`, background:C.sf, color:C.tx, fontSize:12, fontWeight:700, cursor:"pointer" }}>
        別の日時で予約する
      </button>
    </div>
  );

  if (status==="error") return (
    <div style={{ padding:"8px 0" }}>
      <div style={{ background:"#FFF0F0", borderRadius:13, padding:"20px", textAlign:"center", marginBottom:12 }}>
        <div style={{ fontSize:28, marginBottom:8 }}>!️</div>
        <div style={{ fontSize:14, fontWeight:700, color:C.red, marginBottom:6 }}>送信に失敗しました</div>
      </div>
      <button onClick={()=>setStatus("idle")} style={{ width:"100%", padding:"11px", borderRadius:10, border:`1px solid ${C.bd}`, background:C.sf, color:C.tx, fontSize:12, fontWeight:700, cursor:"pointer" }}>戻る</button>
    </div>
  );

  return (
    <div style={{ padding:"8px 0" }}>
      {/* ヘッダー */}
      <div style={{ background:C.brand, borderRadius:13, padding:"18px 18px 14px", marginBottom:12 }}>
        <div style={{ fontSize:10, color:"rgba(17,48,9,0.55)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>{is1?"Executive Session":"Coaching Session"}</div>
        <div style={{ fontSize:17, fontWeight:800, color:C.dark, fontFamily:"Georgia,serif", marginBottom:6 }}>{is1?"社長1on1":"コーチング"}</div>
        <div style={{ fontSize:11, color:"rgba(17,48,9,0.7)", lineHeight:1.5, marginBottom:10 }}>{is1?"代表とのプライベートセッション。":"コーチとマンツーマンのセッション。"}空き時間から希望日時を選んで予約できます。</div>
        {/* カレンダー同期バッジ */}
        <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(17,48,9,0.08)", borderRadius:8, padding:"5px 10px" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:"#4CAF50" }}/>
          <span style={{ fontSize:10, color:"rgba(17,48,9,0.7)" }}>Googleカレンダー同期済み · {new Date().toLocaleDateString("ja-JP")} 取得</span>
        </div>
      </div>

      {/* STEP 1: 日付選択 */}
      <div style={{ background:C.sf, borderRadius:13, padding:"14px", border:`1px solid ${C.bd}`, marginBottom:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.tx }}>STEP 1 — 日付を選ぶ</div>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={()=>setWeekOffset(Math.max(0,weekOffset-1))} disabled={weekOffset===0}
              style={{ width:26, height:26, borderRadius:6, border:`1px solid ${C.bd}`, background:weekOffset===0?"#f0f0f0":C.sf, cursor:weekOffset===0?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Ic n="chevL" s={13} c={weekOffset===0?C.bd:C.tx}/>
            </button>
            <button onClick={()=>setWeekOffset(weekOffset+1)}
              style={{ width:26, height:26, borderRadius:6, border:`1px solid ${C.bd}`, background:C.sf, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Ic n="chevR" s={13} c={C.tx}/>
            </button>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
          {days.map((d,i) => {
            const ds = dateStr(d);
            const avail = getAvailableSlots(ds);
            const isSelected = selectedDate && dateStr(selectedDate)===ds;
            const isSun = d.getDay()===0, isSat = d.getDay()===6;
            const hasSlots = avail.length > 0;
            return (
              <div key={i} onClick={()=>{ if(hasSlots){ setSelectedDate(d); setSelectedSlot(null); }}}
                style={{ borderRadius:8, padding:"6px 2px", textAlign:"center", cursor:hasSlots?"pointer":"default",
                  background:isSelected?C.dark:hasSlots?C.sfOl:"#F5F5F5",
                  border:isSelected?`2px solid ${C.dark}`:`1px solid ${C.bdL}`,
                  opacity:hasSlots?1:0.45 }}>
                <div style={{ fontSize:9, color:isSelected?C.brand:isSun?"#C44040":isSat?"#4060C4":C.txS, marginBottom:2 }}>{d.getMonth()+1}/{d.getDate()}</div>
                <div style={{ fontSize:8, fontWeight:700, color:isSelected?C.brand:isSun?"#C44040":isSat?"#4060C4":C.txS, marginBottom:3 }}>{DAY_LABELS[d.getDay()]}</div>
                <div style={{ fontSize:8, color:isSelected?"rgba(213,212,146,0.8)":hasSlots?C.dark:C.txS }}>{hasSlots?`${avail.length}枠`:"×"}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 2: 時間選択 */}
      {selectedDate && (
        <div style={{ background:C.sf, borderRadius:13, padding:"14px", border:`1px solid ${C.bd}`, marginBottom:10 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.tx, marginBottom:3 }}>STEP 2 — 時間を選ぶ</div>
          <div style={{ fontSize:10, color:C.txS, marginBottom:10 }}>{dateLabel(selectedDate)} の空き時間（各1時間・前後1時間バッファ込み）</div>
          {slots.length===0 ? (
            <div style={{ textAlign:"center", padding:"16px", color:C.txS, fontSize:11 }}>この日は空き時間がありません</div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
              {slots.map((s,i) => {
                const isSel = selectedSlot===s;
                return (
                  <div key={i} onClick={()=>setSelectedSlot(s)}
                    style={{ borderRadius:8, padding:"8px 4px", textAlign:"center", cursor:"pointer",
                      background:isSel?C.dark:C.sfOl,
                      border:isSel?`2px solid ${C.dark}`:`1px solid ${C.bdL}` }}>
                    <div style={{ fontSize:12, fontWeight:700, color:isSel?C.brand:C.tx }}>{s}</div>
                    <div style={{ fontSize:9, color:isSel?"rgba(213,212,146,0.7)":C.txS }}>〜{fmtTime(toMins(s)+60)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* STEP 3: 入力 */}
      {selectedSlot && (
        <div style={{ background:C.sf, borderRadius:13, padding:"14px", border:`1px solid ${C.bd}`, marginBottom:10 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.tx, marginBottom:3 }}>STEP 3 — 予約情報を入力</div>
          <div style={{ fontSize:10, color:C.txS, marginBottom:12 }}>氏名は必須です。所属は任意です。</div>
          <div style={{ marginBottom:10 }}>
            <div style={{ display:"flex", gap:5, alignItems:"center", marginBottom:5 }}>
              <span style={{ fontSize:11, fontWeight:700, color:C.tx }}>氏名</span>
              <span style={{ fontSize:9, fontWeight:700, color:C.sf, background:C.red, borderRadius:3, padding:"1px 5px" }}>必須</span>
            </div>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="例：木寺 蒼真"
              style={{ width:"100%", borderRadius:9, border:`1px solid ${name?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
          </div>
          <div style={{ marginBottom:10 }}>
            <div style={{ display:"flex", gap:5, alignItems:"center", marginBottom:5 }}>
              <span style={{ fontSize:11, fontWeight:700, color:C.tx }}>所属</span>
              <span style={{ fontSize:9, color:C.txS, background:C.sfOl, borderRadius:3, padding:"1px 5px" }}>任意</span>
            </div>
            <input type="text" value={affil} onChange={e=>setAffil(e.target.value)} placeholder="例：〇〇大学 / 〇〇株式会社"
              style={{ width:"100%", borderRadius:9, border:`1px solid ${C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.tx, marginBottom:5 }}>相談内容</div>
            <textarea value={topic} onChange={e=>setTopic(e.target.value)}
              placeholder="例：キャリア相談・事業アイデアなど"
              style={{ width:"100%", minHeight:64, borderRadius:9, border:`1px solid ${C.bd}`, padding:"9px 12px", fontSize:11, color:C.tx, background:C.sfOl, resize:"none", boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
          </div>
        </div>
      )}

      {/* 確認 */}
      {selectedSlot && (
        <div style={{ background:C.sfOl, borderRadius:11, padding:"12px 14px", border:`1px solid ${C.bd}`, marginBottom:10 }}>
          <div style={{ fontSize:10, fontWeight:700, color:C.txS, marginBottom:8 }}>予約内容の確認</div>
          {[
            [<Ic n="calendar" s={12} c={C.dark}/>, selectedDate&&dateLabel(selectedDate)],
            [<Ic n="clock" s={12} c={C.dark}/>, `${selectedSlot} 〜 ${fmtTime(toMins(selectedSlot)+60)}（60分）`],
            [<Ic n="user" s={12} c={C.dark}/>, name||<span style={{color:C.red,fontSize:10}}>氏名を入力してください</span>],
          ].map(([icon,val],i)=>(
            <div key={i} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:i<2?6:0 }}>
              {icon}<span style={{ fontSize:11, fontWeight:i<2?700:400, color:C.tx }}>{val}</span>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSubmit}
        disabled={!selectedDate||!selectedSlot||!name.trim()||status==="loading"}
        style={{ width:"100%", padding:"13px", borderRadius:10, border:"none",
          background:selectedDate&&selectedSlot&&name.trim()&&status!=="loading"?C.dark:"#C0C8A0",
          color:selectedDate&&selectedSlot&&name.trim()&&status!=="loading"?C.brand:"#888",
          fontSize:13, fontWeight:700, cursor:selectedDate&&selectedSlot&&name.trim()&&status!=="loading"?"pointer":"default",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
        {status==="loading"?(
          <><div style={{width:14,height:14,border:`2px solid rgba(255,255,255,0.3)`,borderTop:`2px solid ${C.sf}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/> 送信中…</>
        ):"予約する・Gmail通知＆カレンダー登録"}
      </button>
    </div>
  );
}

function MeetingForm({ title, date, time, freq, desc, isJiji }) {
  const [answer, setAnswer]   = useState(null); // null | "yes" | "no"
  const [name, setName]       = useState("");
  const [reason, setReason]   = useState("");
  const [submitted, setSubmitted] = useState(false);

  const color = isJiji ? "#3D6030" : "#113009";

  if (submitted) {
    return (
      <div>
        {/* 会議情報カード */}
        <div style={{ background:C.dark, borderRadius:14, padding:"18px", marginBottom:14 }}>
          <div style={{ fontSize:10, color:"rgba(213,212,146,0.6)", letterSpacing:"0.1em", marginBottom:4 }}>{freq}</div>
          <div style={{ fontSize:18, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", marginBottom:6 }}>{title}</div>
          <div style={{ display:"flex", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}><Ic n="calendar" s={11} c="rgba(213,212,146,0.6)" /><span style={{ fontSize:11, color:"rgba(213,212,146,0.8)" }}>{date}</span></div>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}><Ic n="clock" s={11} c="rgba(213,212,146,0.6)" /><span style={{ fontSize:11, color:"rgba(213,212,146,0.8)" }}>{time}</span></div>
          </div>
        </div>
        {/* 完了メッセージ */}
        <div style={{ background:answer==="yes"?"#E8F5E0":"#FFF0F0", borderRadius:14, padding:"24px 20px", textAlign:"center", border:`1px solid ${answer==="yes"?"#B8DCA8":"#FFD0D0"}` }}>
          <div style={{ fontSize:32, marginBottom:12 }}>{answer==="yes"?"◎":"—"}</div>
          <div style={{ fontSize:16, fontWeight:800, color:C.tx, fontFamily:"Georgia,serif", marginBottom:8 }}>
            {answer==="yes"?"参加申込が完了しました！":"欠席の回答を受け付けました"}
          </div>
          <div style={{ fontSize:12, color:C.txM, lineHeight:1.7 }}>
            {answer==="yes"
              ? `${date} ${time}\nの${title}でお待ちしております。`
              : `また次回の${title}でお会いしましょう。`}
          </div>
          {name && <div style={{ marginTop:10, fontSize:11, color:C.txS }}>回答者：{name}</div>}
        </div>
        <button onClick={()=>{setSubmitted(false);setAnswer(null);setName("");setReason("");}}
          style={{ width:"100%", marginTop:12, padding:"11px", borderRadius:10, border:`1px solid ${C.bd}`, background:C.sf, color:C.tx, fontSize:12, fontWeight:700, cursor:"pointer" }}>
          回答を変更する
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* 会議情報カード */}
      <div style={{ background:C.dark, borderRadius:14, padding:"18px", marginBottom:14 }}>
        <div style={{ fontSize:10, color:"rgba(213,212,146,0.6)", letterSpacing:"0.1em", marginBottom:4 }}>{freq}</div>
        <div style={{ fontSize:18, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", marginBottom:8 }}>{title}</div>
        <div style={{ display:"flex", gap:14, marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}><Ic n="calendar" s={12} c="rgba(213,212,146,0.6)" /><span style={{ fontSize:12, color:"rgba(213,212,146,0.85)" }}>{date}</span></div>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}><Ic n="clock" s={12} c="rgba(213,212,146,0.6)" /><span style={{ fontSize:12, color:"rgba(213,212,146,0.85)" }}>{time}</span></div>
        </div>
        <div style={{ fontSize:11, color:"rgba(213,212,146,0.7)", lineHeight:1.7 }}>{desc}</div>
      </div>

      {/* 申込フォーム */}
      <div style={{ background:C.sf, borderRadius:14, padding:"18px", border:`1px solid ${C.bd}` }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.tx, marginBottom:4 }}>今回の会議に参加できますか？</div>
        <div style={{ fontSize:11, color:C.txS, marginBottom:16 }}>{date} {time}</div>

        {/* 参加・不参加ボタン */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
          <button
            onClick={()=>setAnswer("yes")}
            style={{ padding:"14px 8px", borderRadius:12, border:`2px solid ${answer==="yes"?color:C.bdL}`, background:answer==="yes"?color:"none", color:answer==="yes"?C.brand:C.txS, fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <span style={{ fontSize:24 }}>·</span>
            <span style={{ fontSize:12 }}>参加できる</span>
          </button>
          <button
            onClick={()=>setAnswer("no")}
            style={{ padding:"14px 8px", borderRadius:12, border:`2px solid ${answer==="no"?C.red:C.bdL}`, background:answer==="no"?"#FFF0F0":"none", color:answer==="no"?C.red:C.txS, fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <span style={{ fontSize:24 }}>×</span>
            <span style={{ fontSize:12 }}>参加できない</span>
          </button>
        </div>

        {/* 名前入力 */}
        {answer && (
          <>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.tx, marginBottom:5 }}>お名前</div>
              <input
                type="text"
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder="例：木寺 蒼真"
                style={{ width:"100%", borderRadius:9, border:`1px solid ${name?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}
              />
            </div>
            {answer==="no" && (
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.tx, marginBottom:5 }}>欠席理由（任意）</div>
                <textarea
                  value={reason}
                  onChange={e=>setReason(e.target.value)}
                  placeholder="例：予定が入っています"
                  rows={2}
                  style={{ width:"100%", borderRadius:9, border:`1px solid ${C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, resize:"none", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}
                />
              </div>
            )}
            <button
              onClick={()=>{ if(name.trim()) setSubmitted(true); }}
              disabled={!name.trim()}
              style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background:name.trim()?C.dark:"#C0C8A0", color:name.trim()?C.brand:"#888", fontSize:13, fontWeight:700, cursor:name.trim()?"pointer":"default" }}>
              {answer==="yes"?"参加申込を送る":"欠席を回答する"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ══ ReLab ══ */
function ReLab() {
  const [det, setDet] = useState(null);   // メニューキー
  const [lesson, setLesson] = useState(null); // BSCの項目index
  const TM = {biz:"ビジネス情報",basic:"前提基礎知識",meeting:"企業研究会議",jiji:"時事会議",oneon1:"社長1on1",coach:"コーチング"};

  // ── 前提基礎知識 個別詳細 ──
  if (det === "basic" && lesson !== null) {
    const item = BSC[lesson];
    const sectionColor = { "導入":C.mid, "序説":"#4A6B3A", "本説":C.dark, "末説":"#2A4820" };
    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
        <div style={{ flexShrink:0, height:52, display:"flex", alignItems:"center", gap:11, padding:"0 16px", background:C.sf, borderBottom:`1px solid ${C.bd}` }}>
          <button onClick={() => setLesson(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={22} c={C.tx} /></button>
          <span style={{ fontSize:14, fontWeight:700, color:C.tx, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.no} {item.title}</span>
        </div>
        <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"16px" }}>
          {/* セクションバッジ */}
          <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
            <span style={{ fontSize:10, color:C.sf, background:sectionColor[item.tag]||C.dark, borderRadius:4, padding:"3px 9px", fontWeight:700 }}>{item.tag}</span>
            <span style={{ fontSize:10, color:C.txS, background:C.sfOl, borderRadius:4, padding:"3px 9px", fontWeight:600 }}>{item.section}</span>
            <span style={{ fontSize:10, color:C.txS, background:C.sfOl, borderRadius:4, padding:"3px 9px" }}>{item.rt}で読める</span>
          </div>
          {/* タイトル */}
          <div style={{ background:C.dark, borderRadius:13, padding:"18px", marginBottom:14 }}>
            <div style={{ fontSize:11, color:"rgba(213,212,146,0.6)", letterSpacing:"0.08em", marginBottom:6 }}>{item.no}</div>
            <div style={{ fontSize:16, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", lineHeight:1.45 }}>{item.title}</div>
          </div>
          {/* リッチコンテンツ */}
          <LessonContent idx={lesson} />
          {/* 前後ナビ */}
          <div style={{ display:"flex", gap:10, marginTop:4 }}>
            {lesson > 0 && (
              <button onClick={() => setLesson(lesson-1)} style={{ flex:1, padding:"11px", borderRadius:10, border:`1px solid ${C.bd}`, background:C.sf, color:C.tx, fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                <Ic n="chevL" s={14} c={C.tx} /> 前へ
              </button>
            )}
            {lesson < BSC.length-1 && (
              <button onClick={() => setLesson(lesson+1)} style={{ flex:1, padding:"11px", borderRadius:10, border:"none", background:C.dark, color:C.sf, fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                次へ <Ic n="chevR" s={14} c={C.sf} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── 前提基礎知識 項目一覧 ──
  if (det === "basic") {
    const SECTIONS = [
      { label:"0. 導入",  tag:"導入",  color:C.mid },
      { label:"1. 序説",  tag:"序説",  color:"#4A6B3A" },
      { label:"2. 本説",  tag:"本説",  color:C.dark },
      { label:"3. 末説",  tag:"末説",  color:"#2A4820" },
    ];
    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
        <div style={{ flexShrink:0, height:52, display:"flex", alignItems:"center", gap:11, padding:"0 16px", background:C.sf, borderBottom:`1px solid ${C.bd}` }}>
          <button onClick={() => setDet(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={22} c={C.tx} /></button>
          <span style={{ fontSize:15, fontWeight:700, color:C.tx }}>前提基礎知識</span>
          <span style={{ marginLeft:"auto", fontSize:10, color:C.txS, background:C.sfOl, borderRadius:4, padding:"2px 8px" }}>全{BSC.length}項目</span>
        </div>
        <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"13px" }}>
          {/* イントロバナー */}
          <div style={{ background:C.dark, borderRadius:13, padding:"16px 18px", marginBottom:16 }}>
            <div style={{ fontSize:10, color:"rgba(213,212,146,0.6)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Re.Lab ビジネス研究所</div>
            <div style={{ fontSize:14, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", lineHeight:1.4 }}>学びの追求の場として、各々がインプットとアウトプットを繰り返す。</div>
          </div>
          {/* セクション別リスト */}
          {SECTIONS.map(sec => (
            <div key={sec.tag} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ width:4, height:16, borderRadius:2, background:sec.color }} />
                <span style={{ fontSize:12, fontWeight:700, color:C.tx }}>{sec.label}</span>
              </div>
              {BSC.filter(b => b.tag === sec.tag).map((b, _) => {
                const idx = BSC.indexOf(b);
                return (
                  <div key={idx} onClick={() => setLesson(idx)} style={{ background:C.sf, borderRadius:12, padding:"13px 14px", marginBottom:8, display:"flex", alignItems:"center", gap:12, cursor:"pointer", border:`1px solid ${C.bd}` }}>
                    <div style={{ width:36, height:36, borderRadius:9, background:sec.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontSize:13, fontWeight:800, color:C.brand }}>{b.no}</span>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:C.tx, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.title}</div>
                      <div style={{ fontSize:10, color:C.txS }}>{b.rt}で読める</div>
                    </div>
                    <Ic n="chevR" s={14} c={C.bd} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── その他メニュー詳細 ──
  if (det) {
    const is1 = det==="oneon1", isC = det==="coach";
    const items = det==="biz"?BIZ : det==="meeting"?MTS.slice(0,2) : det==="jiji"?MTS.slice(1) : null;
    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
        <div style={{ flexShrink:0, height:52, display:"flex", alignItems:"center", gap:11, padding:"0 16px", background:C.sf, borderBottom:`1px solid ${C.bd}` }}>
          <button onClick={() => setDet(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={22} c={C.tx} /></button>
          <span style={{ fontSize:15, fontWeight:700, color:C.tx }}>{TM[det]}</span>
        </div>
        <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"14px" }}>
          {det==="biz" && (
            <div>
              {/* ヘッダーバナー */}
              <div style={{ background:C.dark, borderRadius:13, padding:"14px 16px", marginBottom:14 }}>
                <div style={{ fontSize:10, color:"rgba(213,212,146,0.6)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Business Intelligence</div>
                <div style={{ fontSize:14, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", lineHeight:1.4 }}>地方創生×ビジネスの最前線を読む</div>
              </div>
              {items.map((b,i) => (
                <div key={i} style={{ background:C.sf, borderRadius:14, marginBottom:14, border:`1px solid ${C.bd}`, overflow:"hidden" }}>
                  {/* カードヘッダー */}
                  <div style={{ background:b.tagColor, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:15, fontWeight:700, letterSpacing:"0.05em", fontFamily:"serif" }}>{b.em}</span>
                      <span style={{ fontSize:10, fontWeight:700, color:C.brand, background:"rgba(255,255,255,0.15)", borderRadius:4, padding:"2px 8px" }}>{b.tag}</span>
                    </div>
                    <span style={{ fontSize:10, color:"rgba(255,255,255,0.65)" }}>{b.rt}で読める</span>
                  </div>
                  {/* カード本文 */}
                  <div style={{ padding:"13px 14px" }}>
                    <div style={{ fontSize:13, fontWeight:800, color:C.tx, lineHeight:1.45, marginBottom:8 }}>{b.title}</div>
                    <div style={{ fontSize:11, color:C.txM, lineHeight:1.65, marginBottom:12, paddingBottom:12, borderBottom:`1px solid ${C.bdL}` }}>{b.summary}</div>
                    {/* ポイント */}
                    <div style={{ marginBottom:12 }}>
                      <div style={{ fontSize:10, fontWeight:700, color:C.txS, letterSpacing:"0.08em", marginBottom:7 }}>KEY POINTS</div>
                      {b.points.map((pt,j) => (
                        <div key={j} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:6 }}>
                          <div style={{ width:16, height:16, borderRadius:"50%", background:b.tagColor, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                            <span style={{ fontSize:8, fontWeight:800, color:C.brand }}>{j+1}</span>
                          </div>
                          <div style={{ fontSize:11, color:C.tx, lineHeight:1.55, flex:1 }}>{pt}</div>
                        </div>
                      ))}
                    </div>
                    {/* インサイト */}
                    <div style={{ background:C.sfOl, borderRadius:9, padding:"9px 11px", borderLeft:`3px solid ${b.tagColor}` }}>
                      <div style={{ fontSize:9, fontWeight:700, color:C.txS, marginBottom:3 }}>→ Regional Lab 視点</div>
                      <div style={{ fontSize:11, color:C.tx, lineHeight:1.55 }}>{b.insight}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {(det==="meeting"||det==="jiji") && (() => {
            const isJiji = det === "jiji";

            // 日付計算
            const today = new Date("2026-04-23");

            // 時事会議：次の水曜日
            const daysToWed = (3 - today.getDay() + 7) % 7 || 7;
            const nextWed = new Date(today);
            nextWed.setDate(today.getDate() + daysToWed);
            const jijiDate = `${nextWed.getMonth()+1}月${nextWed.getDate()}日（水）`;

            // 企業研究会議：今月の最終金曜日
            const lastDay = new Date(today.getFullYear(), today.getMonth()+1, 0);
            const daysBack = (lastDay.getDay() - 5 + 7) % 7;
            const lastFri = new Date(lastDay);
            lastFri.setDate(lastDay.getDate() - daysBack);
            const meetDate = `${lastFri.getMonth()+1}月${lastFri.getDate()}日（金）`;

            const title    = isJiji ? "時事会議" : "企業研究会議";
            const date     = isJiji ? jijiDate : meetDate;
            const time     = "22:00〜23:00";
            const freq     = isJiji ? "毎週水曜日 22:00〜23:00" : "毎月最終週の金曜日 22:00〜23:00";
            const desc     = isJiji
              ? "最新の地方創生政策・社会トレンドを読み解くディスカッション会議。時事ニュースへの解像度を高め、ビジネス・地域課題への応用思考を磨きます。"
              : "スタートアップ・地域企業の事例を深掘りするリサーチ＆ディスカッション会議。ビジネスモデル・戦略・資金調達など多角的に研究します。";

            return (
              <MeetingForm
                title={title}
                date={date}
                time={time}
                freq={freq}
                desc={desc}
                isJiji={isJiji}
              />
            );
          })()}
          {(is1||isC) && (
            <OneOnOneBooking is1={is1} />
          )}
        </div>
      </div>
    );
  }

  // ── トップメニュー ──
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
      <div style={{ flexShrink:0, background:C.sf, borderBottom:`1px solid ${C.bd}`, padding:"16px 16px 13px" }}>
        <div style={{ fontSize:11, color:C.txS, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:2 }}>Community</div>
        <div style={{ fontSize:20, fontWeight:800, color:C.tx, fontFamily:"Georgia,serif" }}>Re.Lab</div>
      </div>
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"13px" }}>
        {RL_MENU.map(m => (
          <div key={m.k} onClick={() => { setDet(m.k); setLesson(null); }} style={{ background:C.sf, borderRadius:12, padding:"14px", marginBottom:10, display:"flex", alignItems:"center", gap:13, cursor:"pointer", border:`1px solid ${C.bd}` }}>
            <div style={{ width:46, height:46, borderRadius:12, background:C.rl, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Ic n={m.i} s={21} c={C.dark} /></div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.tx, marginBottom:2 }}>{m.t}</div>
              <div style={{ fontSize:11, color:C.txS }}>{m.s}</div>
            </div>
            {m.k==="basic" && <span style={{ fontSize:9, color:C.dark, background:C.brand, borderRadius:3, padding:"2px 6px", fontWeight:700, marginRight:4 }}>20項目</span>}
            <Ic n="chevR" s={15} c={C.bd} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ Profile ══ */
function Profile({ currentPlan, onPlanChange, userProfile, onProfileChange, memberNo, onLogout }) {
  const [sec, setSec] = useState(null);

  /* ── 通知設定 state ── */
  const [notif, setNotif] = useState({
    event:   true,
    feed:    true,
    dm:      true,
    news:    false,
  });

  /* ── プロフィール編集 state（グローバルuserProfileから初期化） ── */
  const [pf, setPf] = useState({
    name:        userProfile?.name        || "",
    furigana:    userProfile?.furigana    || "",
    birthdate:   userProfile?.birthdate   || "",
    gender:      userProfile?.gender      || "",
    occupation:  userProfile?.occupation  || "",
    affiliation: userProfile?.affiliation || "",
    location:    userProfile?.location    || "",
    email:       userProfile?.email       || "",
  });
  const [pfSaved, setPfSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(userProfile?.avatar || null);

  /* ── 退会申請 state（条件分岐より前に定義必須） ── */
  const [wName,    setWName]    = useState(pf.name || "");
  const [wReason,  setWReason]  = useState("");
  const [wSince,   setWSince]   = useState("");
  const [wLoading, setWLoading] = useState(false);
  const [wDone,    setWDone]    = useState(false);
  const [wError,   setWError]   = useState("");

  /* ── 管理者モード ── */
  const isAdmin  = currentPlan === "admin";
  function handleAdminLogout() { onPlanChange("free"); }

  const PREFS = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];
  const GRADES = ["1年","2年","3年","4年","M1","M2","D1","D2","D3","その他"];

  function calcAge(dob) {
    if (!dob) return "";
    const b = new Date(dob), t = new Date();
    let a = t.getFullYear() - b.getFullYear();
    if (t.getMonth() < b.getMonth() || (t.getMonth()===b.getMonth() && t.getDate()<b.getDate())) a--;
    return a > 0 ? String(a) : "";
  }
  function handleDob(v) {
    setPf(p => ({ ...p, birthdate:v, dob:v, age:calcAge(v) }));
  }

  /* ── アバター画像アップロード ── */
  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    // ファイルサイズ制限: 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("画像サイズは2MB以下にしてください");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setAvatarPreview(base64);
      onProfileChange?.(prev => ({ ...prev, avatar: base64 }));
    };
    reader.readAsDataURL(file);
  }

  /* ── プロフィール保存（会員番号・パスワードは変更不可） ── */
  function handleSave() {
    onProfileChange?.(prev => ({
      ...prev,
      name:        pf.name,
      furigana:    pf.furigana,
      birthdate:   pf.birthdate,
      gender:      pf.gender,
      occupation:  pf.occupation,
      affiliation: pf.affiliation,
      location:    pf.location,
      email:       pf.email,
    }));
    setPfSaved(true);
    setTimeout(() => setPfSaved(false), 2500);
  }

  const pfRequired = pf.name && pf.email;

  const FLabel = ({label, req}) => (
    <div style={{ display:"flex", gap:5, alignItems:"center", marginBottom:5 }}>
      <span style={{ fontSize:11, fontWeight:700, color:C.tx }}>{label}</span>
      {req && <span style={{ fontSize:9, fontWeight:700, color:C.sf, background:C.red, borderRadius:3, padding:"1px 5px" }}>必須</span>}
    </div>
  );
  const FInput = ({field, placeholder, type="text"}) => (
    <input type={type} value={pf[field]} onChange={e=>setPf(p=>({...p,[field]:e.target.value}))}
      placeholder={placeholder}
      style={{ width:"100%", borderRadius:9, border:`1px solid ${pf[field]?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }} />
  );
  const FSelect = ({field, options, placeholder}) => (
    <select value={pf[field]} onChange={e=>setPf(p=>({...p,[field]:e.target.value}))}
      style={{ width:"100%", borderRadius:9, border:`1px solid ${pf[field]?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:pf[field]?C.tx:C.txS, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none", appearance:"none" }}>
      <option value="">{placeholder}</option>
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );


  /* ── 通知設定画面 ── */
  if (sec === "notif") {
    const NOTIF_ITEMS = [
      { key:"event", label:"イベント通知",    desc:"新しいイベントの案内・申込確認" },
      { key:"feed",  label:"フィード通知",    desc:"フィードへの新しい投稿・いいね" },
      { key:"dm",    label:"DM・チャット通知",desc:"メンバーからのメッセージ" },
      { key:"news",  label:"お知らせ通知",    desc:"Regional Labからのお知らせ" },
    ];

    async function requestPermissionAndToggle(key) {
      const next = !notif[key];
      // 通知をONにしようとした時、ブラウザの通知許可をリクエスト
      if (next && "Notification" in window) {
        const perm = await Notification.requestPermission();
        if (perm === "granted" && next) {
          // サンプル通知を表示
          new Notification("Regional Lab", {
            body: `${NOTIF_ITEMS.find(i=>i.key===key)?.label}をオンにしました`,
            icon: "/favicon.ico",
          });
        }
      }
      setNotif(p => ({ ...p, [key]: next }));
    }

    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
        <div style={{ flexShrink:0, height:52, display:"flex", alignItems:"center", gap:11, padding:"0 16px", background:C.sf, borderBottom:`1px solid ${C.bd}` }}>
          <button onClick={()=>setSec(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={22} c={C.tx} /></button>
          <span style={{ fontSize:15, fontWeight:700, color:C.tx }}>通知設定</span>
        </div>
        <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"14px" }}>
          <div style={{ background:C.sfOl, borderRadius:10, padding:"10px 14px", marginBottom:14, display:"flex", gap:8, alignItems:"flex-start" }}>
            <span style={{ fontSize:14 }}>○</span>
            <span style={{ fontSize:11, color:C.txM, lineHeight:1.6 }}>通知をオンにすると、スマートフォンのプッシュ通知でお知らせが届きます。</span>
          </div>
          <div style={{ background:C.sf, borderRadius:13, overflow:"hidden", border:`1px solid ${C.bd}` }}>
            {NOTIF_ITEMS.map((item, i) => (
              <div key={item.key} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderBottom: i < NOTIF_ITEMS.length-1 ? `1px solid ${C.bdL}` : "none" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.tx, marginBottom:2 }}>{item.label}</div>
                  <div style={{ fontSize:10, color:C.txS }}>{item.desc}</div>
                </div>
                {/* トグルスイッチ */}
                <div
                  onClick={() => requestPermissionAndToggle(item.key)}
                  style={{ width:48, height:28, borderRadius:14, background: notif[item.key] ? C.dark : "#C8CFC0", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}
                >
                  <div style={{
                    position:"absolute", top:3, left: notif[item.key] ? 23 : 3,
                    width:22, height:22, borderRadius:"50%", background:C.sf,
                    transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)"
                  }}/>
                </div>
              </div>
            ))}
          </div>
          {/* 全体ON/OFF */}
          <button
            onClick={() => {
              const allOn = Object.values(notif).every(v=>v);
              setNotif({ event:!allOn, feed:!allOn, dm:!allOn, news:!allOn });
            }}
            style={{ width:"100%", marginTop:12, padding:"11px", borderRadius:10, border:`1px solid ${C.bd}`, background:C.sf, color:C.tx, fontSize:12, fontWeight:700, cursor:"pointer" }}
          >
            {Object.values(notif).every(v=>v) ? "すべての通知をオフにする" : "すべての通知をオンにする"}
          </button>
        </div>
      </div>
    );
  }

  /* ── 退会申請画面 ── */
  if (sec === "withdraw") {
    async function handleWithdraw() {
      if (!wName || !wReason || !wSince) { setWError("全ての項目を入力してください"); return; }
      setWLoading(true); setWError("");
      try {
        const params = new URLSearchParams({
          action:      "withdraw",
          memberNo:    memberNo || "",
          name:        wName,
          reason:      wReason,
          since:       wSince,
          email:       pf.email || "",
        });
        await fetch(
          `https://script.google.com/macros/s/AKfycbwg3UYJr4GByIUPBYT8jE-7MZ0JamdDagNV1ZXI1UNBbHKCHfgKOD5DxS0mQNKVnwqW/exec?` + params.toString(),
          { method:"GET" }
        );
        setWDone(true);
      } catch(e) {
        setWError("送信エラーが発生しました。しばらく後に再試行してください。");
      }
      setWLoading(false);
    }

    if (wDone) return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
        <div style={{ flexShrink:0, height:52, display:"flex", alignItems:"center", gap:11, padding:"0 16px", background:C.sf, borderBottom:`1px solid ${C.bd}` }}>
          <button onClick={()=>setSec(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={22} c={C.tx} /></button>
          <span style={{ fontSize:15, fontWeight:700, color:C.tx }}>退会申請</span>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px" }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"#FFF8F0", border:"2px solid #C07030", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#C07030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{ fontSize:16, fontWeight:800, color:C.tx, marginBottom:10 }}>退会申請を受け付けました</div>
          <div style={{ fontSize:12, color:C.txS, lineHeight:1.8, textAlign:"center" }}>
            運営側で確認後、承認いたします。<br/>
            承認完了後にご連絡いたします。<br/>
            しばらくお待ちください。
          </div>
        </div>
      </div>
    );

    return (
      <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
        <div style={{ flexShrink:0, height:52, display:"flex", alignItems:"center", gap:11, padding:"0 16px", background:C.sf, borderBottom:`1px solid ${C.bd}` }}>
          <button onClick={()=>setSec(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={22} c={C.tx} /></button>
          <span style={{ fontSize:15, fontWeight:700, color:C.tx }}>退会申請</span>
        </div>
        <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"14px" }}>
          {/* 注意書き */}
          <div style={{ background:"#FFF8F0", borderRadius:12, padding:"14px 16px", marginBottom:16, border:"1px solid #F0D0A0" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#C07030", marginBottom:6 }}>退会申請前にご確認ください</div>
            <div style={{ fontSize:11, color:"#8A5020", lineHeight:1.8 }}>
              · 退会申請後、運営側で確認・承認いたします<br/>
              · 承認後、スプレッドシートのデータが消去されます<br/>
              · 退会後の再入会は新規登録となります
            </div>
          </div>
          {/* フォーム */}
          <div style={{ background:C.sf, borderRadius:13, padding:"16px", border:`1px solid ${C.bd}`, marginBottom:14 }}>
            <div style={{ fontSize:10, color:C.txS, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>退会申請フォーム</div>
            {/* 氏名 */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.tx, marginBottom:6 }}>氏名 <span style={{ color:C.red }}>*</span></div>
              <input value={wName} onChange={e=>setWName(e.target.value)} placeholder="地方 創生"
                style={{ width:"100%", borderRadius:9, border:`1px solid ${wName?C.dark:C.bd}`, padding:"10px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
            </div>
            {/* 会員開始年月 */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.tx, marginBottom:6 }}>会員開始年月 <span style={{ color:C.red }}>*</span></div>
              <input type="month" value={wSince} onChange={e=>setWSince(e.target.value)}
                style={{ width:"100%", borderRadius:9, border:`1px solid ${wSince?C.dark:C.bd}`, padding:"10px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
              <div style={{ fontSize:9, color:C.txS, marginTop:4 }}>会員登録を開始した年月を選択してください</div>
            </div>
            {/* 退会理由 */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.tx, marginBottom:6 }}>退会理由 <span style={{ color:C.red }}>*</span></div>
              <select value={wReason} onChange={e=>setWReason(e.target.value)}
                style={{ width:"100%", borderRadius:9, border:`1px solid ${wReason?C.dark:C.bd}`, padding:"10px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none", cursor:"pointer", marginBottom:8 }}>
                <option value="">選択してください</option>
                <option value="費用面の理由">費用面の理由</option>
                <option value="活動内容が合わなかった">活動内容が合わなかった</option>
                <option value="時間が取れなくなった">時間が取れなくなった</option>
                <option value="目的を達成した">目的を達成した</option>
                <option value="他のコミュニティに移る">他のコミュニティに移る</option>
                <option value="その他">その他</option>
              </select>
              <textarea value={wReason==="その他"||wReason?wReason:""}
                onChange={e=>setWReason(e.target.value)}
                placeholder="詳細な理由があればご記入ください（任意）"
                rows={3}
                style={{ width:"100%", borderRadius:9, border:`1px solid ${C.bd}`, padding:"10px 12px", fontSize:11, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none", resize:"vertical" }}/>
            </div>
          </div>
          {wError && <div style={{ fontSize:11, color:C.red, marginBottom:10, padding:"8px 12px", background:"#FFF0F0", borderRadius:8 }}>{wError}</div>}
          <button onClick={handleWithdraw} disabled={wLoading || !wName || !wReason || !wSince}
            style={{ width:"100%", padding:"13px", borderRadius:10, border:"none", background:(!wName||!wReason||!wSince)?"#C0C8A0":"#C07030", color:(!wName||!wReason||!wSince)?"#888":"#fff", fontSize:13, fontWeight:700, cursor:(!wName||!wReason||!wSince)?"default":"pointer", marginBottom:8 }}>
            {wLoading ? "送信中..." : "退会申請を送信する"}
          </button>
          <button onClick={()=>setSec(null)} style={{ width:"100%", padding:"10px", borderRadius:9, border:"none", background:"none", color:C.txS, fontSize:12, cursor:"pointer" }}>
            キャンセル
          </button>
        </div>
      </div>
    );
  }

  if (sec === "edit") return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
      <div style={{ flexShrink:0, height:52, display:"flex", alignItems:"center", gap:11, padding:"0 16px", background:C.sf, borderBottom:`1px solid ${C.bd}` }}>
        <button onClick={()=>{setSec(null);}} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={22} c={C.tx} /></button>
        <span style={{ fontSize:15, fontWeight:700, color:C.tx }}>プロフィール編集</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"14px" }}>
        {pfSaved && (
          <div style={{ background:"#E8F5E0", borderRadius:10, padding:"10px 14px", marginBottom:12, display:"flex", alignItems:"center", gap:8, border:"1px solid #B8DCA8" }}>
            <span style={{ fontSize:14, color:"#2A5820" }}>·</span>
            <span style={{ fontSize:12, fontWeight:700, color:"#2A5820" }}>プロフィールを保存しました</span>
          </div>
        )}

        {/* ── アイコン画像 ── */}
        <div style={{ background:C.sf, borderRadius:13, padding:"16px", border:`1px solid ${C.bd}`, marginBottom:10 }}>
          <div style={{ fontSize:10, color:C.txS, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>プロフィール画像</div>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:C.sfOl, border:`2px solid ${C.bdL}`, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                : <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={C.txS} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>
              }
            </div>
            <div style={{ flex:1 }}>
              <label style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"9px 16px", borderRadius:9, border:`1.5px solid ${C.dark}`, background:"none", color:C.dark, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                画像を選ぶ
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{display:"none"}} />
              </label>
              <div style={{ fontSize:9, color:C.txS, marginTop:5, lineHeight:1.5 }}>JPG・PNG・GIF・WEBP（2MB以下）<br/>Event Labのコメント欄でも表示されます</div>
            </div>
          </div>
          {avatarPreview && (
            <button onClick={()=>{ setAvatarPreview(null); onProfileChange?.(p=>({...p,avatar:null})); }}
              style={{ marginTop:10, padding:"6px 12px", borderRadius:7, border:`1px solid ${C.bdL}`, background:"none", color:C.txS, fontSize:10, cursor:"pointer" }}>
              画像を削除
            </button>
          )}
        </div>

        {/* ── 基本情報 ── */}
        <div style={{ background:C.sf, borderRadius:13, padding:"16px", border:`1px solid ${C.bd}`, marginBottom:10 }}>
          <div style={{ fontSize:10, color:C.txS, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>基本情報</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div>
              <FLabel label="氏名" req/>
              <FInput field="name" placeholder="例：木寺 蒼真"/>
            </div>
            <div>
              <FLabel label="フリガナ"/>
              <input value={pf.furigana||""} onChange={e=>setPf(p=>({...p,furigana:e.target.value}))} placeholder="キデラ ソウマ"
                style={{ width:"100%", borderRadius:9, border:`1px solid ${pf.furigana?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div>
              <FLabel label="生年月日"/>
              <input type="date" value={pf.birthdate||""} onChange={e=>handleDob(e.target.value)}
                style={{ width:"100%", borderRadius:9, border:`1px solid ${pf.birthdate?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
            </div>
            <div>
              <FLabel label="性別"/>
              <FSelect field="gender" options={["男性","女性","その他","回答しない"]} placeholder="選択"/>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div>
              <FLabel label="職業"/>
              <input value={pf.occupation||""} onChange={e=>setPf(p=>({...p,occupation:e.target.value}))} placeholder="学生 / 会社員"
                style={{ width:"100%", borderRadius:9, border:`1px solid ${pf.occupation?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
            </div>
            <div>
              <FLabel label="所属"/>
              <input value={pf.affiliation||""} onChange={e=>setPf(p=>({...p,affiliation:e.target.value}))} placeholder="○○大学 / ○○会社"
                style={{ width:"100%", borderRadius:9, border:`1px solid ${pf.affiliation?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
            </div>
          </div>
          <div style={{ marginBottom:12 }}>
            <FLabel label="居住地"/>
            <input value={pf.location||""} onChange={e=>setPf(p=>({...p,location:e.target.value}))} placeholder="新潟県南魚沼市"
              style={{ width:"100%", borderRadius:9, border:`1px solid ${pf.location?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
          </div>
          <div style={{ marginBottom:0 }}>
            <FLabel label="メールアドレス" req/>
            <input type="email" value={pf.email||""} onChange={e=>setPf(p=>({...p,email:e.target.value}))} placeholder="example@email.com"
              style={{ width:"100%", borderRadius:9, border:`1px solid ${pf.email?C.dark:C.bd}`, padding:"9px 12px", fontSize:12, color:C.tx, background:C.sfOl, boxSizing:"border-box", fontFamily:"inherit", outline:"none" }}/>
          </div>
        </div>

        {/* ── 変更不可項目 ── */}
        <div style={{ background:C.sfOl, borderRadius:13, padding:"16px", border:`1px solid ${C.bdL}`, marginBottom:14 }}>
          <div style={{ fontSize:10, color:C.txS, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>変更できない項目</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:C.txS, marginBottom:5 }}>会員番号</div>
              <div style={{ background:"rgba(17,48,9,0.06)", borderRadius:9, padding:"9px 12px", fontSize:13, fontWeight:700, color:C.txM, border:`1px solid ${C.bdL}`, letterSpacing:"0.1em" }}>{memberNo || "-----"}</div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:C.txS, marginBottom:5 }}>パスワード</div>
              <div style={{ background:"rgba(17,48,9,0.06)", borderRadius:9, padding:"9px 12px", fontSize:13, color:C.txM, border:`1px solid ${C.bdL}` }}>••••</div>
            </div>
          </div>
          <div style={{ fontSize:9, color:C.txS, marginTop:8 }}>会員番号・パスワードの変更はお問い合わせください</div>
        </div>

        <button onClick={handleSave} disabled={!pfRequired}
          style={{ width:"100%", padding:"13px", borderRadius:10, border:"none", background:pfRequired?C.dark:"#C0C8A0", color:pfRequired?C.sf:"#888", fontSize:13, fontWeight:700, cursor:pfRequired?"pointer":"default", marginBottom:6 }}>
          保存する
        </button>
        {!pfRequired && <div style={{ textAlign:"center", fontSize:10, color:C.txS }}>※ 氏名・メールアドレスは必須です</div>}
      </div>
    </div>
  );

  /* ── 料金プラン画面 ── */
  if (sec === "plan") return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
      <div style={{ flexShrink:0, height:52, display:"flex", alignItems:"center", gap:11, padding:"0 16px", background:C.sf, borderBottom:`1px solid ${C.bd}` }}>
        <button onClick={() => setSec(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Ic n="chevL" s={22} c={C.tx} /></button>
        <span style={{ fontSize:15, fontWeight:700, color:C.tx }}>料金プラン</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch", padding:"13px" }}>
        {PLANS.map((pl,i) => {
          const isCurrent = pl.planKey === currentPlan;
          return (
          <div key={i} style={{ marginBottom:14, borderRadius:14, overflow:"hidden", border:isCurrent?`2px solid ${C.dark}`:`1px solid ${C.bd}` }}>
            {/* プランヘッダー */}
            <div style={{ background:pl.color, padding:"14px 16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                <div>
                  <div style={{ fontSize:10, fontWeight:700, color:pl.nameColor, letterSpacing:"0.08em", background:"rgba(255,255,255,0.35)", borderRadius:4, padding:"2px 7px", display:"inline-block", marginBottom:5 }}>{pl.badge}</div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:2 }}>
                    <span style={{ fontSize:24, fontWeight:900, color:i===3?C.brand:C.dark }}>{pl.price}</span>
                    <span style={{ fontSize:11, color:i===3?"rgba(213,212,146,0.7)":C.txS }}>{pl.pd}</span>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:13, fontWeight:800, color:i===3?C.brand:C.dark, fontFamily:"Georgia,serif" }}>{pl.name}</div>
                  {isCurrent && <span style={{ background:C.dark, color:C.brand, fontSize:9, fontWeight:700, borderRadius:4, padding:"2px 7px", marginTop:4, display:"inline-block" }}>現在のプラン</span>}
                </div>
              </div>
            </div>
            {/* 特典リスト */}
            <div style={{ background:C.sf, padding:"12px 16px 14px" }}>
              {pl.ft.map((f,j) => (
                <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:7, marginBottom:7 }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", background:i===3?C.dark:C.sfOl, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                    <Ic n="check" s={9} c={i===3?C.brand:C.dark} />
                  </div>
                  <span style={{ fontSize:11, color:C.tx, lineHeight:1.5 }}>{f}</span>
                </div>
              ))}
              {/* ボタン */}
              {!isCurrent && (
                pl.stripe ? (
                  <a href={pl.stripe} target="_blank" rel="noreferrer"
                    onClick={()=>onPlanChange(pl.planKey)}
                    style={{ display:"block", width:"100%", marginTop:10, padding:"12px", borderRadius:9, border:"none", background:C.dark, color:C.brand, fontSize:13, fontWeight:700, cursor:"pointer", textAlign:"center", textDecoration:"none", boxSizing:"border-box" }}>
                    → Stripeで決済する
                  </a>
                ) : (
                  <button
                    onClick={()=>onPlanChange(pl.planKey)}
                    style={{ width:"100%", marginTop:10, padding:"10px", borderRadius:9, border:`1.5px solid ${C.dark}`, background:"none", color:C.dark, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                    このプランに変更
                  </button>
                )
              )}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );

  /* ── マイページトップ ── */
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg, position:"relative" }}>


      <div style={{ flex:1, overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
        <div style={{ background: isAdmin ? C.dark : C.brand, padding:"24px 18px 26px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-20, right:-20, width:90, height:90, borderRadius:"50%", background:"rgba(17,48,9,0.08)" }} />
          {isAdmin && (
            <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(213,212,146,0.15)", borderRadius:6, padding:"3px 10px", marginBottom:10 }}>
              <span style={{ fontSize:11 }}>▪</span>
              <span style={{ fontSize:10, fontWeight:700, color:C.brand }}>運営者モード</span>
            </div>
          )}
          <div style={{ fontSize:11, color: isAdmin ? "rgba(213,212,146,0.55)" : "rgba(17,48,9,0.55)", letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12 }}>My Account</div>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            {/* アバター — クリックで画像変更 */}
            <label style={{ cursor:"pointer", position:"relative", flexShrink:0 }}>
              <div style={{ width:54, height:54, borderRadius:"50%", background: isAdmin ? C.brand : C.dark, display:"flex", alignItems:"center", justifyContent:"center", color: isAdmin ? C.dark : C.brand, fontWeight:800, fontSize:20, border:`3px solid ${isAdmin ? "rgba(213,212,146,0.4)" : "rgba(255,255,255,0.5)"}`, overflow:"hidden" }}>
                {avatarPreview
                  ? <img src={avatarPreview} alt="avatar" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  : isAdmin ? "✦" : (pf.name ? pf.name[0] : "U")
                }
              </div>
              <div style={{ position:"absolute", bottom:0, right:0, width:18, height:18, borderRadius:"50%", background:C.sf, border:`1.5px solid ${C.bd}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{display:"none"}} />
            </label>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:17, fontWeight:800, color: isAdmin ? C.brand : C.dark }}>{isAdmin ? "Regional Lab 運営者" : (pf.name || "ユーザー名")}</div>
              <div style={{ fontSize:11, color: isAdmin ? "rgba(213,212,146,0.65)" : "rgba(17,48,9,0.65)", marginTop:1 }}>{isAdmin ? "全機能アクセス可" : (pf.affiliation || "所属未設定")}</div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:5 }}>
                <span style={{ background: isAdmin ? C.brand : C.dark, color: isAdmin ? C.dark : C.brand, fontSize:10, fontWeight:700, borderRadius:4, padding:"2px 9px" }}>
                  {isAdmin ? "▪ Admin" : (PLANS.find(p=>p.planKey===currentPlan)?.name || "Free")}
                </span>
                {memberNo && <span style={{ fontSize:9, color: isAdmin ? "rgba(213,212,146,0.5)" : "rgba(17,48,9,0.45)", letterSpacing:"0.05em" }}>No. {memberNo}</span>}
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding:"13px" }}>
          <div style={{ background:C.sf, borderRadius:12, overflow:"hidden", border:`1px solid ${C.bd}`, marginBottom:10 }}>
            {MNEW.map((item,i) => {
              const isContact = item.l === "お問い合わせ";
              const inner = (
                <div key={i}
                  onClick={
                    item.l==="ご利用の料金プラン" ? ()=>setSec("plan")
                    : item.l==="プロフィール編集"  ? ()=>setSec("edit")
                    : item.l==="通知設定"          ? ()=>setSec("notif")
                    : undefined
                  }
                  style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderBottom:i<MNEW.length-1?`1px solid ${C.bdL}`:"none", cursor:"pointer" }}>
                  <div style={{ width:35, height:35, borderRadius:9, background:C.sfOl, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Ic n={item.i} s={16} c={C.dark} /></div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, color:C.tx, fontWeight:600 }}>{item.l}</div>
                    <div style={{ fontSize:10, color:C.txS, marginTop:1 }}>
                      {item.l==="プロフィール編集" && pf.name ? `${pf.name} · ${pf.affil||"所属未設定"}`
                        : item.l==="通知設定" ? (Object.values(notif).some(v=>v) ? "一部の通知がオン" : "すべてオフ")
                        : item.s}
                    </div>
                  </div>
                  <Ic n="chevR" s={14} c={C.bd} />
                </div>
              );
              return isContact ? (
                <a key={i} href="https://www.instagram.com/regional_lab?igsh=MWJiZWx6bXNxc2JjNw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" style={{ textDecoration:"none", display:"block" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderBottom:i<MNEW.length-1?`1px solid ${C.bdL}`:"none", cursor:"pointer" }}>
                    <div style={{ width:35, height:35, borderRadius:9, background:C.sfOl, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Ic n={item.i} s={16} c={C.dark} /></div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, color:C.tx, fontWeight:600 }}>{item.l}</div>
                      <div style={{ fontSize:10, color:C.txS, marginTop:1 }}>{item.s}</div>
                    </div>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.bd} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </a>
              ) : inner;
            })}
          </div>
          {/* 退会申請（管理者以外のみ表示） */}
          {!isAdmin && (
            <div style={{ background:C.sf, borderRadius:12, border:`1px solid ${C.bd}`, marginBottom:10 }}>
              <div onClick={()=>setSec("withdraw")} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", cursor:"pointer" }}>
                <div style={{ width:35, height:35, borderRadius:9, background:"#FFF8F0", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ic n="shield" s={16} c="#C07030" />
                </div>
                <div>
                  <div style={{ fontSize:12, color:"#C07030", fontWeight:600 }}>退会申請</div>
                  <div style={{ fontSize:10, color:C.txS, marginTop:1 }}>退会をご希望の方はこちら</div>
                </div>
              </div>
            </div>
          )}
          {/* 管理者モード解除 or 通常ログアウト */}
          <div style={{ background:C.sf, borderRadius:12, border:`1px solid ${C.bd}` }}>
            <div onClick={isAdmin ? handleAdminLogout : onLogout} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", cursor:"pointer" }}>
              <div style={{ width:35, height:35, borderRadius:9, background: isAdmin ? "rgba(213,212,146,0.15)" : "#FFF0F0", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Ic n="logout" s={16} c={isAdmin ? C.dark : C.red} />
              </div>
              <div style={{ fontSize:12, color: isAdmin ? C.tx : C.red, fontWeight:600 }}>
                {isAdmin ? "運営者モードを解除する" : "ログアウト"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══ アクセスロック画面 ══ */
function LockedScreen({ tabName, requiredPlan, onGoToPlan }) {
  const info = {
    el: {
      icon:"", title:"Event Lab",
      desc:"イベントの閲覧・申込・参加には\nEvent Lab プラン（¥2,000/月）以上が必要です。",
      plans:["Event Lab ¥2,000/月","Event Lab Pro ¥3,000/月","Re.Lab ¥15,000/月"],
    },
    rl: {
      icon:"", title:"Re.Lab",
      desc:"Re.Labのコンテンツ閲覧・利用には\nRe.Lab プラン（¥15,000/月）が必要です。",
      plans:["Re.Lab ¥15,000/月（Event Lab も無条件付帯）"],
    },
  }[requiredPlan];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, padding:"40px 24px" }}>
      <div style={{ width:72, height:72, borderRadius:20, background:C.dark, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
        <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div style={{ fontSize:22, marginBottom:8 }}>{info.icon}</div>
      <div style={{ fontSize:18, fontWeight:800, color:C.tx, fontFamily:"Georgia,serif", marginBottom:10 }}>{info.title}</div>
      <div style={{ fontSize:13, color:C.txM, lineHeight:1.7, textAlign:"center", marginBottom:24, whiteSpace:"pre-line", maxWidth:360 }}>{info.desc}</div>
      <div style={{ width:"100%", maxWidth:360, background:C.sf, borderRadius:12, padding:"14px 16px", border:`1px solid ${C.bd}`, marginBottom:18 }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.txS, letterSpacing:"0.08em", marginBottom:10 }}>利用可能なプラン</div>
        {info.plans.map((p,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom: i < info.plans.length-1 ? 8 : 0 }}>
            <div style={{ width:16, height:16, borderRadius:"50%", background:C.sfOl, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span style={{ fontSize:12, color:C.tx, fontWeight:600 }}>{p}</span>
          </div>
        ))}
      </div>
      <button onClick={onGoToPlan} style={{ padding:"12px 28px", borderRadius:10, border:"none", background:C.dark, color:C.brand, fontSize:13, fontWeight:700, cursor:"pointer", maxWidth:360, width:"100%" }}>
        プランを確認・変更する →
      </button>
    </div>
  );
}

/* ══ レスポンシブ対応スタイル ══ */
const webStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #D0D898; border-radius: 10px; }

  .rl-sidebar {
    width: 240px;
    flex-shrink: 0;
  }
  .rl-main {
    flex: 1;
    min-width: 0;
    max-width: 860px;
  }
  .rl-right {
    width: 300px;
    flex-shrink: 0;
  }

  /* スマホ：サイドバーを非表示、ボトムナビを表示 */
  @media (max-width: 768px) {
    .rl-sidebar { display: none !important; }
    .rl-right   { display: none !important; }
    .rl-bottom-nav { display: flex !important; }
    .rl-main { max-width: 100%; }
    .rl-content-wrap { padding-bottom: 72px !important; }
  }
  @media (min-width: 769px) {
    .rl-bottom-nav { display: none !important; }
  }

  @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  .rl-fade { animation: fadeIn 0.22s ease; }
  @keyframes pulse2 { 0%,100%{opacity:1} 50%{opacity:0.35} }
`;

/* ══ App（Web版・レスポンシブ） ══ */
/* タブ定義（App外で定義） */
const WEB_TABS = [
  { k:"home", l:"Home",      i:"home",  desc:"最新情報" },
  { k:"el",   l:"Event Lab", i:"globe", desc:"イベント" },
  { k:"rl",   l:"Re.Lab",    i:"lab",   desc:"コミュニティ" },
  { k:"me",   l:"My Page",   i:"user",  desc:"プロフィールと設定" },
];

/* ── サイドナビアイテム（App外） ── */
function SideNavItem({ t, active, locked, onClick }) {
  return (
    <button onClick={onClick} style={{
      width:"100%", display:"flex", alignItems:"center", gap:12,
      padding:"11px 14px", borderRadius:12, border:"none", cursor:"pointer",
      background: active ? C.dark : "transparent",
      marginBottom:4, textAlign:"left", position:"relative",
    }}>
      <div style={{ width:36, height:36, borderRadius:10, background: active ? "rgba(213,212,146,0.15)" : C.sfOl, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <Ic n={t.i} s={18} c={active ? C.brand : locked ? C.bdL : C.dark} />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color: active ? C.brand : locked ? C.bdL : C.tx }}>{t.l}</div>
        <div style={{ fontSize:10, color: active ? "rgba(213,212,146,0.6)" : C.txS, marginTop:1 }}>{t.desc}</div>
      </div>
      {locked && (
        <div style={{ width:16, height:16, borderRadius:"50%", background:C.red, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <svg width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
      )}
    </button>
  );
}

/* ── 右パネル（App外） ── */
function RightPanel({ currentPlan, onTabChange }) {
  return (
    <div style={{ padding:"20px 0" }}>
      <div style={{ background:C.dark, borderRadius:16, padding:"18px", marginBottom:14 }}>
        <div style={{ fontSize:10, color:"rgba(213,212,146,0.55)", letterSpacing:"0.1em", marginBottom:6 }}>ABOUT</div>
        <div style={{ fontSize:14, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", marginBottom:8, lineHeight:1.5 }}>地方の魅力をお洒落に、美しく、上質に、</div>
        <div style={{ fontSize:10, color:"rgba(213,212,146,0.7)", lineHeight:1.7 }}>南魚沼を支える企業へ、地方の未来を彩る組織へ</div>
      </div>
      <div style={{ background:C.sf, borderRadius:16, padding:"16px", border:`1px solid ${C.bd}`, marginBottom:14 }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.txS, letterSpacing:"0.08em", marginBottom:12 }}>— PICKUP EVENT</div>
        {EVTS.map((e,i) => (
          <div key={i} style={{ marginBottom: i < EVTS.length-1 ? 12 : 0, paddingBottom: i < EVTS.length-1 ? 12 : 0, borderBottom: i < EVTS.length-1 ? `1px solid ${C.bdL}` : "none" }}>
            <div style={{ fontSize:10, color:C.dark, background:C.sfOl, borderRadius:4, padding:"2px 7px", fontWeight:700, display:"inline-block", marginBottom:4 }}>{e.tag}</div>
            <div style={{ fontSize:12, fontWeight:700, color:C.tx, marginBottom:4, lineHeight:1.4 }}>{e.title}</div>
            <div style={{ display:"flex", gap:10 }}>
              <span style={{ fontSize:10, color:C.txS }}>{e.loc}</span>
              <span style={{ fontSize:10, color:C.txS }}>{e.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:`linear-gradient(135deg,${C.mid},${C.dark})`, borderRadius:16, padding:"16px" }}>
        <div style={{ fontSize:11, color:"rgba(213,212,146,0.7)", marginBottom:6 }}>現在のプラン</div>
        <div style={{ fontSize:16, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", marginBottom:10 }}>
          {PLANS.find(p=>p.planKey===currentPlan)?.name || "Free"}
        </div>
        <button onClick={()=>onTabChange("me")} style={{ width:"100%", padding:"9px", borderRadius:9, border:`1px solid rgba(213,212,146,0.4)`, background:"rgba(213,212,146,0.1)", color:C.brand, fontSize:11, fontWeight:700, cursor:"pointer" }}>
          プランを変更する →
        </button>
      </div>
    </div>
  );
}

/* ══ App（Web版・レスポンシブ） ══ */
/* ══ GAS エンドポイント（デプロイ後にURLを貼り付ける） ══ */
const GAS_URL = "https://script.google.com/macros/s/AKfycbwg3UYJr4GByIUPBYT8jE-7MZ0JamdDagNV1ZXI1UNBbHKCHfgKOD5DxS0mQNKVnwqW/exec";

/* ══ ログイン・会員登録 フロントエンド ══ */
function AuthScreen({ onLogin }) {
  const [mode, setMode]       = useState("top");   // "top"|"login"|"register"
  const [step, setStep]       = useState(1);        // register: 1=基本情報 2=アカウント情報
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  /* ── ログインフォーム state ── */
  const [loginNo,   setLoginNo]   = useState("");
  const [loginPass, setLoginPass] = useState("");
  const loginNoRef   = useRef(null);
  const loginPassRef = useRef(null);

  /* ── 会員登録フォーム state ── */
  const [reg, setReg] = useState({
    name:"", furigana:"", birthdate:"", gender:"",
    occupation:"", affiliation:"", location:"", grade:"",
    email:"", password:"", passwordConfirm:""
  });
  const setR = (k,v) => setReg(p=>({...p,[k]:v}));

  /* ── GAS接続済みかチェック ── */
  const GAS_READY = GAS_URL && !GAS_URL.includes("YOUR_SCRIPT_ID");

  /* ── ログイン処理 ── */
  async function handleLogin() {
    if (!loginNo || !loginPass) { setError("会員番号とパスワードを入力してください"); return; }
    setLoading(true); setError("");

    const rawNo = loginNoRef.current ? loginNoRef.current.value : loginNo;
    const rawPass = loginPassRef.current ? loginPassRef.current.value : loginPass;
    const paddedNo = rawNo.padStart(5, "0");
    const effectivePass = rawPass || loginPass;

    /* 運営者ログイン（GAS未設定でも常にローカル認証） */
    if (paddedNo === "00000" && (loginPass === "1009" || effectivePass === "1009")) {
      onLogin({ memberNo:"00000", name:"運営者", plan:"admin", isAdmin:true, email:"" });
      setLoading(false);
      return;
    }

    /* GAS未設定の場合はエラーを案内 */
    if (!GAS_READY) {
      setError("スプレッドシート連携が未設定のため、運営者（00000）以外はログインできません。");
      setLoading(false);
      return;
    }

    /* GAS経由でログイン（GETパラメータ方式） */
    try {
      const params = new URLSearchParams({ action:"login", memberNo: paddedNo, password: effectivePass });
      const res  = await fetch(GAS_URL + "?" + params.toString(), { method:"GET" });
      const text = await res.text();
      const json = text.match(/\{[\s\S]*\}/);
      const data = JSON.parse(json ? json[0] : text);
      if (data.success) {
        onLogin(data.member);
      } else {
        setError(data.error || "ログインに失敗しました");
      }
    } catch(e) {
      setError("通信エラーが発生しました。しばらく後に再試行してください。");
    }
    setLoading(false);
  }

  /* ── 会員登録処理（GASへ直接フォーム送信） ── */
  async function handleRegister() {
    if (!reg.name||!reg.furigana||!reg.email||!reg.password||!reg.passwordConfirm) {
      setError("必須項目をすべて入力してください"); return;
    }
    if (!/^\d{4}$/.test(reg.password)) {
      setError("パスワードは4桁の数字で入力してください"); return;
    }
    if (reg.password !== reg.passwordConfirm) {
      setError("パスワードが一致しません"); return;
    }
    if (!GAS_READY) {
      setError("スプレッドシート連携が未設定のため、現在は会員登録できません。管理者にお問い合わせください。");
      return;
    }
    setLoading(true); setError("");
    try {
      /* URLSearchParams形式でGASに送信（CORSプリフライト不要） */
      const params = new URLSearchParams({
        action: "register",
        name:        reg.name,
        furigana:    reg.furigana,
        birthdate:   reg.birthdate   || "",
        gender:      reg.gender      || "",
        occupation:  reg.occupation  || "",
        affiliation: reg.affiliation || "",
        location:    reg.location    || "",
        grade:       reg.grade       || "",
        email:       reg.email,
        password:    reg.password,
      });
      const res  = await fetch(GAS_URL + "?" + params.toString(), { method:"GET" });
      const text = await res.text();
      const json = text.match(/\{[\s\S]*\}/);
      const data = JSON.parse(json ? json[0] : text);
      if (data.success) {
        setMode("registered");
        setReg(p=>({...p, _memberNo: data.memberNo}));
      } else {
        setError(data.error || "登録に失敗しました");
      }
    } catch(e) {
      setError("登録エラー: " + e.message);
    }
    setLoading(false);
  }

  /* ── 共通スタイル ── */
  const inputStyle = (val) => ({
    width:"100%", padding:"11px 14px", borderRadius:10, fontSize:13,
    color:C.tx, background:"rgba(255,255,255,0.9)", boxSizing:"border-box",
    border: val ? `1.5px solid ${C.dark}` : `1.5px solid rgba(17,48,9,0.2)`,
    outline:"none", fontFamily:"inherit",
  });
  const labelStyle = {
    fontSize:10, fontWeight:700, color:"rgba(17,48,9,0.7)",
    letterSpacing:"0.08em", marginBottom:5, display:"block"
  };
  const btnPrimary = (disabled=false) => ({
    width:"100%", padding:"13px", borderRadius:12, border:"none",
    background: disabled ? "#C0C8A0" : C.dark,
    color: disabled ? "#888" : C.brand,
    fontSize:14, fontWeight:700, cursor: disabled ? "default" : "pointer",
    marginTop:8,
  });

  /* ── 背景（画像カラーのみ） ── */
  const bgStyle = {
    minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
    padding:"20px",
    background: "#D4D39A",
    fontFamily:"'Noto Sans JP','Hiragino Kaku Gothic ProN',sans-serif",
  };

  /* ── カード ── */
  const cardStyle = {
    width:"100%", maxWidth:460, background:"rgba(255,255,255,0.97)",
    borderRadius:20, padding:"36px 32px", boxShadow:"0 24px 64px rgba(17,48,9,0.25)",
  };

  /* ── ロゴ共通ヘッダー ── */
  const LogoHeader = ({sub}) => (
    <div style={{textAlign:"center", marginBottom:28}}>
      <img src={LOGO} alt="Regional Lab" style={{width:"100%", objectFit:"contain", borderRadius:20, marginBottom:16, display:"block"}}/>
      <div style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:"Georgia,serif",marginBottom:6}}>Regional Lab</div>
      <div style={{fontSize:11,color:C.txS,lineHeight:1.8}}>南魚沼を支える企業へ<br/>地方の未来を彩る組織へ</div>
    </div>
  );

  /* ════ TOP画面 ════ */
  if (mode === "top") return (
    <div style={bgStyle}>
      <div style={cardStyle}>
        <LogoHeader sub="南魚沼を支える企業へ" />
        <button onClick={()=>{setMode("login");setError("");}} style={btnPrimary()}>
          ログイン
        </button>
        <button onClick={()=>{setMode("register");setStep(1);setError("");}}
          style={{...btnPrimary(), background:"none", color:C.dark, border:`1.5px solid ${C.dark}`, marginTop:12}}>
          新規会員登録
        </button>
        <div style={{marginTop:20,textAlign:"center",fontSize:10,color:C.txS,lineHeight:1.7}}>
          Regional Lab へようこそ。<br/>会員登録をして、コミュニティに参加しましょう。
        </div>
      </div>
    </div>
  );

  /* ════ ログイン画面 ════ */
  if (mode === "login") return (
    <div style={bgStyle}>
      <div style={cardStyle}>
        <LogoHeader sub="ログイン" />
        <div style={{marginBottom:14}}>
          <label style={labelStyle}>会員番号</label>
          <input
            ref={loginNoRef}
            type="text"
            inputMode="numeric"
            defaultValue=""
            placeholder="00001"
            maxLength={5}
            onInput={e => setLoginNo(e.target.value.replace(/\D/g,"").slice(0,5))}
            style={{width:"100%",padding:"12px 14px",borderRadius:10,fontSize:14,color:"#0E2808",background:"#fff",boxSizing:"border-box",border:"1.5px solid rgba(17,48,9,0.3)",outline:"none",fontFamily:"inherit"}}
          />
          <div style={{fontSize:9,color:"#6A8060",marginTop:4}}>登録時に発行された5桁の番号</div>
        </div>
        <div style={{marginBottom:8}}>
          <label style={labelStyle}>パスワード（4桁の数字）</label>
          <input
            ref={loginPassRef}
            type="password"
            inputMode="numeric"
            defaultValue=""
            placeholder="••••"
            maxLength={4}
            onInput={e => setLoginPass(e.target.value.replace(/\D/g,"").slice(0,4))}
            style={{width:"100%",padding:"12px 14px",borderRadius:10,fontSize:14,color:"#0E2808",background:"#fff",boxSizing:"border-box",border:"1.5px solid rgba(17,48,9,0.3)",outline:"none",fontFamily:"inherit"}}
          />
        </div>
        {error && <div style={{fontSize:11,color:"#C04040",marginBottom:8,padding:"8px 12px",background:"#FFF0F0",borderRadius:8}}>{error}</div>}
        <button onClick={handleLogin} disabled={loading||!loginNo||!loginPass} style={btnPrimary(loading||!loginNo||!loginPass)}>
          {loading ? "確認中..." : "ログイン"}
        </button>
        <button onClick={()=>{setMode("top");setError("");setLoginNo("");setLoginPass("");}}
          style={{width:"100%",padding:"10px",borderRadius:10,border:"none",background:"none",color:C.txS,fontSize:12,cursor:"pointer",marginTop:8}}>
          ← 戻る
        </button>
        <div style={{marginTop:16,padding:"12px",background:C.sfOl,borderRadius:10,fontSize:10,color:C.txS,textAlign:"center"}}>
          会員番号をお忘れの方は<br/>Instagramよりお問い合わせください。
        </div>
      </div>
    </div>
  );

  /* ════ 会員登録完了 ════ */
  if (mode === "registered") return (
    <div style={bgStyle}>
      <div style={cardStyle}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:C.dark,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:"Georgia,serif",marginBottom:8}}>登録完了</div>
          <div style={{fontSize:12,color:C.txS,lineHeight:1.7}}>Regional Lab へようこそ！</div>
        </div>
        <div style={{background:C.dark,borderRadius:14,padding:"20px",textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:10,color:"rgba(213,212,146,0.6)",letterSpacing:"0.15em",marginBottom:6}}>あなたの会員番号</div>
          <div style={{fontSize:36,fontWeight:900,color:C.brand,fontFamily:"Georgia,serif",letterSpacing:"0.1em"}}>{reg._memberNo}</div>
          <div style={{fontSize:10,color:"rgba(213,212,146,0.5)",marginTop:6}}>この番号はログインに必要です。必ず控えておいてください。</div>
        </div>
        <button onClick={()=>onLogin({memberNo:reg._memberNo,name:reg.name,furigana:reg.furigana,birthdate:reg.birthdate,gender:reg.gender,occupation:reg.occupation,affiliation:reg.affiliation,location:reg.location,grade:reg.grade,plan:"free",isAdmin:false,email:reg.email})}
          style={btnPrimary()}>
          サイトへ進む
        </button>
      </div>
    </div>
  );

  /* ════ 会員登録フォーム ════ */
  return (
    <div style={bgStyle}>
      <div style={{...cardStyle, maxWidth:500, padding:"32px 28px"}}>
        {/* ヘッダー */}
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <img src={LOGO} alt="RL" style={{width:44,height:44,objectFit:"contain",borderRadius:10}}/>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:C.dark,fontFamily:"Georgia,serif"}}>新規会員登録</div>
            <div style={{fontSize:10,color:C.txS}}>STEP {step} / 2 — {step===1?"基本情報":"アカウント情報"}</div>
          </div>
          {/* ステップバー */}
          <div style={{marginLeft:"auto",display:"flex",gap:4}}>
            {[1,2].map(s=><div key={s} style={{width:28,height:4,borderRadius:2,background:step>=s?C.dark:C.bdL}}/>)}
          </div>
        </div>

        {step === 1 && (
          <div>
            {/* 氏名 */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div>
                <label style={labelStyle}>氏名 <span style={{color:"#C04040"}}>*</span></label>
                <input value={reg.name} onChange={e=>setR("name",e.target.value)} placeholder="地方 創生" style={inputStyle(reg.name)}/>
              </div>
              <div>
                <label style={labelStyle}>フリガナ <span style={{color:"#C04040"}}>*</span></label>
                <input value={reg.furigana} onChange={e=>setR("furigana",e.target.value)} placeholder="チホウ ソウセイ" style={inputStyle(reg.furigana)}/>
              </div>
            </div>
            {/* 生年月日・性別 */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div>
                <label style={labelStyle}>生年月日</label>
                <input type="date" value={reg.birthdate} onChange={e=>setR("birthdate",e.target.value)} style={inputStyle(reg.birthdate)}/>
              </div>
              <div>
                <label style={labelStyle}>性別</label>
                <select value={reg.gender} onChange={e=>setR("gender",e.target.value)}
                  style={{...inputStyle(reg.gender),cursor:"pointer"}}>
                  <option value="">選択してください</option>
                  <option value="男性">男性</option>
                  <option value="女性">女性</option>
                  <option value="その他">その他</option>
                  <option value="回答しない">回答しない</option>
                </select>
              </div>
            </div>
            {/* 職業・所属 */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div>
                <label style={labelStyle}>職業</label>
                <input value={reg.occupation} onChange={e=>setR("occupation",e.target.value)} placeholder="学生 / 会社員" style={inputStyle(reg.occupation)}/>
              </div>
              <div>
                <label style={labelStyle}>所属</label>
                <input value={reg.affiliation} onChange={e=>setR("affiliation",e.target.value)} placeholder="○○大学 / ○○株式会社" style={inputStyle(reg.affiliation)}/>
              </div>
            </div>
            {/* 居住地 */}
            <div style={{marginBottom:12}}>
              <label style={labelStyle}>居住地</label>
              <input value={reg.location} onChange={e=>setR("location",e.target.value)} placeholder="新潟県南魚沼市" style={inputStyle(reg.location)}/>
            </div>
            {/* 学年 */}
            <div style={{marginBottom:20}}>
              <label style={labelStyle}>学年・学歴</label>
              <select value={reg.grade} onChange={e=>setR("grade",e.target.value)}
                style={{...inputStyle(reg.grade),cursor:"pointer"}}>
                <option value="">選択してください</option>
                <optgroup label="大学">
                  <option value="大学1年生">大学1年生</option>
                  <option value="大学2年生">大学2年生</option>
                  <option value="大学3年生">大学3年生</option>
                  <option value="大学4年生">大学4年生</option>
                </optgroup>
                <optgroup label="大学院">
                  <option value="修士1年">修士1年（M1）</option>
                  <option value="修士2年">修士2年（M2）</option>
                  <option value="博士課程">博士課程</option>
                </optgroup>
                <optgroup label="その他">
                  <option value="高校生">高校生</option>
                  <option value="専門学校生">専門学校生</option>
                  <option value="社会人">社会人</option>
                  <option value="既卒">既卒</option>
                  <option value="その他">その他</option>
                </optgroup>
              </select>
            </div>
            {error && <div style={{fontSize:11,color:"#C04040",marginBottom:8,padding:"8px 12px",background:"#FFF0F0",borderRadius:8}}>{error}</div>}
            <button onClick={()=>{
              if(!reg.name||!reg.furigana){setError("氏名・フリガナは必須です");return;}
              setError("");setStep(2);
            }} style={btnPrimary(!reg.name||!reg.furigana)}>
              次へ →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            {/* メールアドレス */}
            <div style={{marginBottom:12}}>
              <label style={labelStyle}>メールアドレス <span style={{color:"#C04040"}}>*</span></label>
              <input type="email" value={reg.email} onChange={e=>setR("email",e.target.value)} placeholder="example@email.com" style={inputStyle(reg.email)}/>
            </div>
            {/* パスワード */}
            <div style={{marginBottom:12}}>
              <label style={labelStyle}>ログインパスワード（4桁の数字）<span style={{color:"#C04040"}}>*</span></label>
              <input type="password" value={reg.password} onChange={e=>setR("password",e.target.value.replace(/\D/g,"").slice(0,4))}
                placeholder="••••" maxLength={4} style={inputStyle(reg.password)}/>
              <div style={{fontSize:9,color:C.txS,marginTop:4}}>0〜9の数字4桁で設定してください</div>
            </div>
            {/* パスワード確認 */}
            <div style={{marginBottom:20}}>
              <label style={labelStyle}>パスワード確認 <span style={{color:"#C04040"}}>*</span></label>
              <input type="password" value={reg.passwordConfirm} onChange={e=>setR("passwordConfirm",e.target.value.replace(/\D/g,"").slice(0,4))}
                placeholder="••••" maxLength={4}
                style={{...inputStyle(reg.passwordConfirm), borderColor: reg.passwordConfirm && reg.password!==reg.passwordConfirm ? "#C04040" : reg.passwordConfirm ? C.dark : "rgba(17,48,9,0.2)"}}/>
              {reg.passwordConfirm && reg.password!==reg.passwordConfirm &&
                <div style={{fontSize:9,color:"#C04040",marginTop:4}}>パスワードが一致しません</div>}
            </div>
            {/* 利用規約 */}
            <div style={{background:C.sfOl,borderRadius:10,padding:"12px",marginBottom:16,fontSize:10,color:C.txS,lineHeight:1.7}}>
              登録することで、Regional Lab の利用規約およびプライバシーポリシーに同意したものとみなします。
            </div>
            {error && <div style={{fontSize:11,color:"#C04040",marginBottom:8,padding:"8px 12px",background:"#FFF0F0",borderRadius:8}}>{error}</div>}
            <button onClick={handleRegister}
              disabled={loading||!reg.email||!reg.password||reg.password!==reg.passwordConfirm}
              style={btnPrimary(loading||!reg.email||!reg.password||reg.password!==reg.passwordConfirm)}>
              {loading ? "登録中..." : "会員登録する"}
            </button>
            <button onClick={()=>{setStep(1);setError("");}}
              style={{width:"100%",padding:"10px",borderRadius:10,border:"none",background:"none",color:C.txS,fontSize:12,cursor:"pointer",marginTop:8}}>
              ← 戻る
            </button>
          </div>
        )}

        {/* 既存会員リンク */}
        <div style={{textAlign:"center",marginTop:16}}>
          <button onClick={()=>{setMode("login");setStep(1);setError("");}}
            style={{background:"none",border:"none",color:C.txS,fontSize:11,cursor:"pointer",textDecoration:"underline"}}>
            既に会員の方はこちら
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [authUser, setAuthUser]     = useState(null);
  const [tab, setTab]               = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [isMobile, setIsMobile]     = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [userProfile, setUserProfile] = useState({
    name:"", furigana:"", birthdate:"", gender:"",
    occupation:"", affiliation:"", location:"", grade:"", email:"",
    memberNo:"", avatar: null,
  });

  /* ウィンドウサイズ監視（hooksは常にreturnより前に） */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  /* 未ログイン → 認証画面を表示 */
  if (!authUser) {
    return <AuthScreen onLogin={(user) => {
      setAuthUser(user);
      if (user.isAdmin) setCurrentPlan("admin");
      else setCurrentPlan(user.plan || "free");
      setUserProfile(p => ({
        ...p,
        name:        user.name        || "",
        furigana:    user.furigana    || "",
        birthdate:   user.birthdate   || "",
        gender:      user.gender      || "",
        occupation:  user.occupation  || "",
        affiliation: user.affiliation || "",
        location:    user.location    || "",
        grade:       user.grade       || "",
        email:       user.email       || "",
        memberNo:    user.memberNo    || "",
      }));
    }} />;
  }

  const canAccess = {
    home: true,
    el:   ["el","elpro","rl","admin"].includes(currentPlan),
    rl:   ["rl","admin"].includes(currentPlan),
    me:   true,
  };

  function goToPlan() { setTab("me"); }

  function renderScreen() {
    if (tab === "home") return <Home onMenuOpen={() => setDrawerOpen(true)} />;
    if (tab === "el") {
      if (!canAccess.el) return <LockedScreen tabName="Event Lab" requiredPlan="el" onGoToPlan={goToPlan} />;
      return <EventLab userProfile={userProfile} currentPlan={currentPlan} />;
    }
    if (tab === "rl") {
      if (!canAccess.rl) return <LockedScreen tabName="Re.Lab" requiredPlan="rl" onGoToPlan={goToPlan} />;
      return <ReLab />;
    }
    if (tab === "me") return <Profile currentPlan={currentPlan} onPlanChange={async (planKey) => {
      setCurrentPlan(planKey);
      if (authUser?.memberNo) {
        try {
          const gasPayload = JSON.stringify({ action:"updatePlan", memberNo: authUser.memberNo, planKey });
          await fetch("https://api.anthropic.com/v1/messages", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
              model:"claude-sonnet-4-20250514",
              max_tokens:200,
              messages:[{role:"user",content:`以下のGASエンドポイントにPOSTリクエストを送ってください。JSONのみ返してください。\nURL: ${GAS_URL}\nBody: ${gasPayload}`}]
            })
          });
        } catch(e) { console.error("プラン更新エラー:", e); }
      }
    }} userProfile={userProfile} onProfileChange={setUserProfile} memberNo={authUser?.memberNo}
    onLogout={() => {
      setAuthUser(null);
      setCurrentPlan("free");
      setTab("home");
      setUserProfile({ name:"", furigana:"", birthdate:"", gender:"", occupation:"", affiliation:"", location:"", grade:"", email:"", memberNo:"", avatar:null });
    }} />;
    return null;
  }

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans JP','Hiragino Kaku Gothic ProN',sans-serif" }}>

      {/* グローバルスタイル */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #D0D898; border-radius: 10px; }
        @keyframes rl-fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .rl-fade { animation: rl-fadeIn 0.2s ease; }
      `}</style>

      {/* ── トップヘッダー ── */}
      <header style={{ position:"sticky", top:0, zIndex:200, background:C.dark, borderBottom:`1px solid rgba(213,212,146,0.15)`, height:58, display:"flex", alignItems:"center", padding:"0 20px", gap:14 }}>
        <img src={NAV} alt="Regional Lab" style={{ height:34, objectFit:"contain", borderRadius:12 }} />
        <div style={{ flex:1 }} />
        <span style={{ fontSize:11, fontWeight:700, color:C.dark, background:C.brand, borderRadius:6, padding:"3px 10px" }}>
          {PLANS.find(p=>p.planKey===currentPlan)?.name || "Free"}
        </span>
        <div onClick={()=>setTab("me")} style={{ width:32, height:32, borderRadius:"50%", background:C.brand, display:"flex", alignItems:"center", justifyContent:"center", color:C.dark, fontWeight:800, fontSize:13, cursor:"pointer" }}>U</div>
      </header>

      {/* ── レイアウト本体 ── */}
      <div style={{ display:"flex", maxWidth:1240, margin:"0 auto", padding:"0 16px" }}>

        {/* 左サイドバー（PC only） */}
        {!isMobile && (
          <aside style={{ width:220, flexShrink:0, padding:"20px 12px 20px 0" }}>
            {/* ロゴ */}
            <div style={{ marginBottom:16, borderBottom:`1px solid ${C.bdL}`, paddingBottom:16 }}>
              <div style={{ borderRadius:20, overflow:"hidden", background:C.dark, padding:"16px 14px 14px", display:"flex", flexDirection:"column", alignItems:"center" }}>
                <img src={LOGO} alt="RL" style={{ width:"100%", objectFit:"contain", borderRadius:16, display:"block" }} />
                <div style={{ fontSize:13, fontWeight:800, color:C.brand, fontFamily:"Georgia,serif", letterSpacing:"0.03em", marginTop:10 }}>Regional Lab</div>
                <div style={{ fontSize:8, color:"rgba(213,212,146,0.8)", marginTop:4, textAlign:"center", lineHeight:2, letterSpacing:"0.65em" }}>南魚沼を支える企業へ<br/>地方の未来を彩る組織へ</div>
              </div>
            </div>
            {/* ナビ */}
            <nav style={{ marginBottom:16 }}>
              {WEB_TABS.map(t => (
                <SideNavItem
                  key={t.k} t={t}
                  active={tab === t.k}
                  locked={!canAccess[t.k]}
                  onClick={() => setTab(t.k)}
                />
              ))}
            </nav>
            {/* Instagram */}
            <a href="https://www.instagram.com/regional_lab?igsh=MWJiZWx6bXNxc2JjNw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", borderRadius:12, background:C.sfOl, textDecoration:"none", border:`1px solid ${C.bdL}` }}>
              <span style={{ fontSize:16 }}>@</span>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:C.tx }}>Instagram</div>
                <div style={{ fontSize:9, color:C.txS }}>@regional_lab</div>
              </div>
            </a>
          </aside>
        )}

        {/* メインコンテンツ */}
        <main style={{ flex:1, minWidth:0, padding: isMobile ? "16px 0 80px" : "16px 0 40px 20px" }}>
          <div className="rl-fade" key={tab}>
            {renderScreen()}
          </div>
        </main>

      </div>

      {/* ── ボトムナビ（スマホ only） ── */}
      {isMobile && (
        <nav style={{ position:"fixed", bottom:0, left:0, right:0, background:C.sf, borderTop:`1px solid ${C.bd}`, height:64, display:"flex", alignItems:"center", zIndex:200 }}>
          {WEB_TABS.map(t => {
            const a = tab === t.k;
            const locked = !canAccess[t.k];
            return (
              <button key={t.k} onClick={() => setTab(t.k)}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:"6px 0", position:"relative" }}>
                <div style={{ width:32, height:32, borderRadius:9, background: a ? C.dark : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ic n={t.i} s={16} c={a ? C.brand : locked ? C.bdL : C.txS} />
                  {locked && (
                    <div style={{ position:"absolute", top:2, right:"calc(50% - 18px)", width:12, height:12, borderRadius:"50%", background:C.red, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width={6} height={6} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                  )}
                </div>
                <span style={{ fontSize:9, color: a ? C.dark : locked ? C.bdL : C.txS, fontWeight: a ? 700 : 400 }}>{t.l}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* ドロワー */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
