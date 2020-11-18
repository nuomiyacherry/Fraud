// 未定义接口
exports.undefinedInterfaces = []

// 请求失败的接口
exports.errorInterfaces = []

module.exports = [
  [
    "/aggregation/getAuthorityReportData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "0": {
          "legendData": [
            "管局上报"
          ],
          "seriesData": [
            [
              1799433,
              3631978,
              2144290,
              3501958,
              2758287,
              1621101
            ]
          ],
          "categoryData": [
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月"
          ]
        },
        "1": {
          "legendData": [
            "管局上报"
          ],
          "seriesData": [
            [
              520,
              819,
              371,
              5253,
              2710,
              727
            ]
          ],
          "categoryData": [
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月"
          ]
        },
        "2": {
          "legendData": [
            "管局上报"
          ],
          "seriesData": [
            [
              5023,
              37865,
              91656,
              28264,
              19396,
              0
            ]
          ],
          "categoryData": [
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月"
          ]
        },
        "3": {
          "legendData": [
            "管局上报"
          ],
          "seriesData": [
            [
              0,
              0,
              0,
              0,
              4241,
              0
            ]
          ],
          "categoryData": [
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月"
          ]
        },
        "6": {
          "legendData": [
            "管局上报"
          ],
          "seriesData": [
            [
              302739,
              119805,
              298440,
              1370727,
              58353,
              80701
            ]
          ],
          "categoryData": [
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月"
          ]
        }
      }
    }
  ],
  [
    "/aggregation/getIndependentDiscoveryData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "categoryData": [
          "2019-03",
          "2019-04",
          "2019-05",
          "2019-06",
          "2019-07",
          "2019-08"
        ],
        "qqDatas": [
          1208,
          808,
          408,
          408,
          4408,
          2408
        ],
        "domainDatas": [
          604,
          504,
          204,
          204,
          2204,
          1204
        ],
        "appDatas": [
          704,
          404,
          204,
          1204,
          2204,
          1204
        ]
      }
    }
  ],
  [
    "/aggregation/getGroupReport",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "legendData": [
          "基础企业上报"
        ],
        "seriesData": [
          [
            0,
            0,
            0,
            2314,
            4132,
            0
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ],
  [
    "/aggregation/get12321Report",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "legendData": [
          "12321举报"
        ],
        "seriesData": [
          [
            6900,
            23759,
            26931,
            13343,
            10750,
            3404
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ],
  [
    "/aggregation/getPublicSecurityCoordination",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {}
    }
  ],
  [
    "/aggregation/getFraudRank",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {}
    }
  ],
  [
    "/aggregation/getFraudAppRank",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesName": "上报量",
        "seriesData": [
          252,
          771,
          1094,
          3176,
          5337
        ],
        "categoryData": [
          "湖南",
          "广东",
          "云南",
          "湖北",
          "四川"
        ]
      }
    }
  ],
  [
    "/aggregation/getFraudDomainRank",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesName": "上报量",
        "seriesData": [
          5005,
          25413,
          127400,
          133362,
          180487
        ],
        "categoryData": [
          "陕西",
          "广东",
          "四川",
          "云南",
          "河北"
        ]
      }
    }
  ],
  [
    "/aggregation/getFraudUrlRank",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesName": "上报量",
        "seriesData": [
          103431,
          1139780,
          1825498,
          4547851,
          5320890
        ],
        "categoryData": [
          "吉林",
          "湖北",
          "四川",
          "云南",
          "河北"
        ]
      }
    }
  ],
  [
    "/aggregation/getFraudMessageRank",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesName": "上报量",
        "seriesData": [
          11090,
          14135,
          26587,
          107015,
          109780
        ],
        "categoryData": [
          "湖南",
          "四川",
          "山西",
          "山东",
          "河北"
        ]
      }
    }
  ],
  [
    "/analysis/fraudRings",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "reportNum": 41,
        "fraudGang": 0,
        "blockNum": 0
      }
    }
  ],
  [
    "/analysis/domainGross",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "legendData": [
          "存活总量"
        ],
        "seriesData": [
          [
            41,
            52,
            156,
            211,
            168,
            137
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ],
  [
    "/analysis/domainLive",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "legendData": [
          "平均存活周期（天）"
        ],
        "seriesData": [
          [
            15.11,
            14.78,
            11.66,
            10.64,
            13.23,
            12.49
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ],
  [
    "/analysis/tableList",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "0": [
          {
            "weChatQQ": "15769272583",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "wx2f7f688342673624",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": "嘉盛国际"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": "广发外汇金融"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "tt.breguet-sa.net",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "bc.smjr168.cn",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "tt.9zhoucq.com",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "z40ws.com",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          }
        ],
        "1": [
          {
            "weChatQQ": "15769272583",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "wx2f7f688342673624",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.4.182.95",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.67.100.198",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.47.52.209",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.34.129.207",
            "control": "是",
            "swindleDomain": "tt.breguet-sa.net",
            "analysis": "是",
            "swindleMainframe": "103.100.122.24",
            "dataTransmission": "",
            "appName": "嘉盛国际"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.67.244.29",
            "control": "是",
            "swindleDomain": "bc.smjr168.cn",
            "analysis": "是",
            "swindleMainframe": "45.93.19.22",
            "dataTransmission": "",
            "appName": "广发外汇金融"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.88.68.244",
            "control": "是",
            "swindleDomain": "tt.9zhoucq.com",
            "analysis": "是",
            "swindleMainframe": "27.50.50.42",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.59.215.158",
            "control": "是",
            "swindleDomain": "z40ws.com",
            "analysis": "是",
            "swindleMainframe": "45.93.19.244",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "27.50.50.42",
            "dataTransmission": "是",
            "appName": "寰球外汇"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "45.93.19.244",
            "dataTransmission": "是",
            "appName": "众赢国际"
          }
        ],
        "2": [
          {
            "weChatQQ": "15769272583",
            "isogeny": "是",
            "ip": "10.4.182.95",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "wx2f7f688342673624",
            "isogeny": "是",
            "ip": "10.67.100.198",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.47.52.209",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.34.129.207",
            "control": "是",
            "swindleDomain": "tt.breguet-sa.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.34.129.207",
            "control": "是",
            "swindleDomain": "tt.breguet-sa.net",
            "analysis": "是",
            "swindleMainframe": "103.100.122.24",
            "dataTransmission": "是",
            "appName": "嘉盛国际"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.67.244.29",
            "control": "是",
            "swindleDomain": "bc.smjr168.cn",
            "analysis": "是",
            "swindleMainframe": "45.93.19.22",
            "dataTransmission": "是",
            "appName": "广发外汇金融"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.88.68.244",
            "control": "是",
            "swindleDomain": "tt.9zhoucq.com",
            "analysis": "是",
            "swindleMainframe": "27.50.50.42",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.59.215.158",
            "control": "是",
            "swindleDomain": "z40ws.com",
            "analysis": "是",
            "swindleMainframe": "45.93.19.244",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "27.50.50.42",
            "dataTransmission": "是",
            "appName": "寰球外汇"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "",
            "control": "",
            "swindleDomain": "",
            "analysis": "",
            "swindleMainframe": "45.93.19.244",
            "dataTransmission": "是",
            "appName": "众赢国际"
          }
        ],
        "3": [
          {
            "weChatQQ": "15769272583",
            "isogeny": "是",
            "ip": "10.4.182.95",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "是",
            "appName": "嘉盛国际"
          },
          {
            "weChatQQ": "wx2f7f688342673624",
            "isogeny": "是",
            "ip": "10.67.100.198",
            "control": "是",
            "swindleDomain": "bc.smjr168.cn",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "是",
            "appName": "广发外汇金融"
          },
          {
            "weChatQQ": "yzf_wexscan",
            "isogeny": "是",
            "ip": "10.37.23.149",
            "control": "是",
            "swindleDomain": "app.rrsse.top",
            "analysis": "是",
            "swindleMainframe": "103.117.138.21",
            "dataTransmission": "是",
            "appName": "币圈国际"
          },
          {
            "weChatQQ": "13187595561",
            "isogeny": "是",
            "ip": "10.63.89.59",
            "control": "是",
            "swindleDomain": "dlw.2sjn.top",
            "analysis": "是",
            "swindleMainframe": "222.186.21.52",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.47.52.209",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.34.129.207",
            "control": "是",
            "swindleDomain": "tt.breguet-sa.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.34.129.207",
            "control": "是",
            "swindleDomain": "tt.breguet-sa.net",
            "analysis": "是",
            "swindleMainframe": "103.100.122.24",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.67.244.29",
            "control": "是",
            "swindleDomain": "bc.smjr168.cn",
            "analysis": "是",
            "swindleMainframe": "45.93.19.22",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.88.68.244",
            "control": "是",
            "swindleDomain": "tt.9zhoucq.com",
            "analysis": "是",
            "swindleMainframe": "27.50.50.42",
            "dataTransmission": "是",
            "appName": "寰球外汇"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.59.215.158",
            "control": "是",
            "swindleDomain": "z40ws.com",
            "analysis": "是",
            "swindleMainframe": "45.93.19.244",
            "dataTransmission": "是",
            "appName": "众赢国际"
          }
        ],
        "4": [
          {
            "weChatQQ": "15769272583",
            "isogeny": "是",
            "ip": "10.4.182.95",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "是",
            "appName": "嘉盛国际"
          },
          {
            "weChatQQ": "wx2f7f688342673624",
            "isogeny": "是",
            "ip": "10.67.100.198",
            "control": "是",
            "swindleDomain": "bc.smjr168.cn",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "是",
            "appName": "广发外汇金融"
          },
          {
            "weChatQQ": "yzf_wexscan",
            "isogeny": "是",
            "ip": "10.37.23.149",
            "control": "是",
            "swindleDomain": "app.rrsse.top",
            "analysis": "是",
            "swindleMainframe": "103.117.138.21",
            "dataTransmission": "是",
            "appName": "币圈国际"
          },
          {
            "weChatQQ": "13187595561",
            "isogeny": "是",
            "ip": "10.63.89.59",
            "control": "是",
            "swindleDomain": "dlw.2sjn.top",
            "analysis": "是",
            "swindleMainframe": "222.186.21.52",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.47.52.209",
            "control": "是",
            "swindleDomain": "tt.badaniu.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.34.129.207",
            "control": "是",
            "swindleDomain": "tt.breguet-sa.net",
            "analysis": "是",
            "swindleMainframe": "103.100.140.53",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.34.129.207",
            "control": "是",
            "swindleDomain": "tt.breguet-sa.net",
            "analysis": "是",
            "swindleMainframe": "103.100.122.24",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.67.244.29",
            "control": "是",
            "swindleDomain": "bc.smjr168.cn",
            "analysis": "是",
            "swindleMainframe": "45.93.19.22",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.88.68.244",
            "control": "是",
            "swindleDomain": "tt.9zhoucq.com",
            "analysis": "是",
            "swindleMainframe": "27.50.50.42",
            "dataTransmission": "是",
            "appName": "寰球外汇"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.59.215.158",
            "control": "是",
            "swindleDomain": "z40ws.com",
            "analysis": "是",
            "swindleMainframe": "45.93.19.244",
            "dataTransmission": "是",
            "appName": "众赢国际"
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.56.115.98",
            "control": "是",
            "swindleDomain": "www.leppu.com",
            "analysis": "是",
            "swindleMainframe": "45.114.9.30",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.66.142.162",
            "control": "是",
            "swindleDomain": "www.leppu.com",
            "analysis": "是",
            "swindleMainframe": "45.114.9.30",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.79.107.13",
            "control": "是",
            "swindleDomain": "www.leppu.com",
            "analysis": "是",
            "swindleMainframe": "45.114.9.30",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.0.77.76",
            "control": "是",
            "swindleDomain": "www.zjgj188.com",
            "analysis": "是",
            "swindleMainframe": "154.209.9.243",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.4.38.133",
            "control": "是",
            "swindleDomain": "www.zjgj188.com",
            "analysis": "是",
            "swindleMainframe": "154.209.9.243",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.131.184.197",
            "control": "是",
            "swindleDomain": "xq.xiaodesuan.cn",
            "analysis": "是",
            "swindleMainframe": "69.176.89.130",
            "dataTransmission": "",
            "appName": ""
          },
          {
            "weChatQQ": "",
            "isogeny": "",
            "ip": "10.91.227.179",
            "control": "是",
            "swindleDomain": "xq.xiaodesuan.cn",
            "analysis": "是",
            "swindleMainframe": "69.176.89.130",
            "dataTransmission": "",
            "appName": ""
          }
        ]
      }
    }
  ],
  [
    "/coordination/getTopData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "domain": 52,
        "app": 0,
        "internetAccount": 27766
      }
    }
  ],
  [
    "/coordination/getWarningTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "domain": "gsyd.vcza.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "y.kanfangge.cn",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "d.gu92f.cn",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "s.youhuib.cn",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "paph.acyl217.vip",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "ya.drkj.wang",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "ezkj.jiuv.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "hcjr.njiu.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "msjr6.wd123.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "rfkj.xzsr.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "yq.hzb88.ltd",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "xmyd.esio.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "rrdsdfc.aslkjcds.xyz",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "zxyd2.appos.shop",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "pa89.7.fbi222.site",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "py.yd981.vip",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "ghyd.xcvz.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "6.6.6.netorg.shop",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "wdph.a.it520.online",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "xmyd.esio.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "www.mofangs.cn",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "s.xiaodai110.com",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "paph.acyl217.vip",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "dmxd.wscn.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        },
        {
          "domain": "ysdk5.biu0t6.cn",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019/08/21"
        }
      ]
    }
  ],
  [
    "/coordination/getDissuadeTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "dissuadeObject": "13265****24",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "15842****65",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "15842****23",
          "location": "北京市丰台区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "15842****78",
          "location": "北京市海淀区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "17724****22",
          "location": "北京市丰台区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "17788****66",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        },
        {
          "dissuadeObject": "15848****99",
          "location": "北京市海淀区",
          "simulateObject": "仿冒工商银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "15845****39",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "13345****45",
          "location": "北京市房山区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "13334****23",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "13342****34",
          "location": "北京市石景山区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "13354****65",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "13356****66",
          "location": "北京市海淀区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "13065****63",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "13358****56",
          "location": "北京市丰台区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "18677****39",
          "location": "北京市海淀区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "15845****39",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        },
        {
          "dissuadeObject": "15845****39",
          "location": "北京市朝阳区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019/08/19"
        }
      ]
    }
  ],
  [
    "/coordination/getNetAccountMonitorTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "account": "875994707",
          "type": "QQ",
          "source": "wangzhuan518.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "2242245432",
          "type": "QQ",
          "source": "888bfw.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "2403846943",
          "type": "QQ",
          "source": "zf158.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "3067800081",
          "type": "QQ",
          "source": "fangjs.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "78246780",
          "type": "QQ",
          "source": "888soso.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "2403846943",
          "type": "QQ",
          "source": "zf158.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "3067800081",
          "type": "QQ",
          "source": "fangjs.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "2242245432",
          "type": "QQ",
          "source": "888bfw.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "78246780",
          "type": "QQ",
          "source": "888soso.com",
          "findTime": "2019/08/21"
        },
        {
          "account": "2403846943",
          "type": "QQ",
          "source": "zf158.com",
          "findTime": "2019/08/21"
        }
      ]
    }
  ],
  [
    "/coordination/getAppMonitorTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "appName": "天天娃娃机",
          "label": "中奖",
          "findTime": "2019/08/20"
        },
        {
          "appName": "WIFI网络电话",
          "label": "打电话(2);任意拨打(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "速缘",
          "label": "打电话(3);呼死你(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "平安彩票HD(1.0.0)",
          "label": "中奖(2);积分(3);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "爱投彩票(1.17)",
          "label": "中奖(2);银行卡(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "果宝特攻王者联盟",
          "label": "返利(4);购物卡(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "熊出没之机甲熊大",
          "label": "中奖(1);购物卡(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "铠甲勇士英雄归来",
          "label": "返利(1);购物卡(2);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "铠甲勇士之英雄传说",
          "label": "中奖(1);返利(1);购物卡(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "狸猫抓娃娃",
          "label": "中奖(1);包邮(1);",
          "findTime": "2019/8/20"
        }
      ]
    }
  ],
  [
    "/coordination/getWebsiteMonitorTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "url": "xiaobaiss.com",
          "title": "小白蜀黍网赚 - 把网赚写成日记，带你了解网络赚钱的那些事！",
          "findTime": "2019/8/20"
        },
        {
          "url": "csds.cc",
          "title": "QQ刷赞网站 - 抖音刷粉丝_快手刷双击赞,刷播放量平台_在线刷赞刷粉丝网站-超速代刷网",
          "findTime": "2019/8/20"
        },
        {
          "url": "v7720.com",
          "title": "葡京娱乐场-打造线上博彩娱乐场，相信葡京娱乐场-相信品牌的力量--打造天下第一诚信平台！提款三分钟到账！",
          "findTime": "2019/8/20"
        },
        {
          "url": "xndama.com",
          "title": "信诺打码 - 验证码代答|远程答题|人工代答|远程代答",
          "findTime": "2019/8/19"
        },
        {
          "url": "xnph66.com",
          "title": "小牛普惠官网_普惠金融信息服务平台",
          "findTime": "2019/8/19"
        },
        {
          "url": "xygtea.com",
          "title": "闲品茶网 一家只做正品的普洱茶网上商城",
          "findTime": "2019/8/19"
        },
        {
          "url": "yahui.cc",
          "title": "亚汇网_全球股票基金财经资讯_专业股票资讯网",
          "findTime": "2019/8/19"
        },
        {
          "url": "vip579.cn",
          "title": "速递空包网速递空包网_www.vip579.cn_拼多多空包_京东空包_淘宝空包_快递单号购买_空包代发_速递联盟_拼多多刷单_拼多多放单_快递空包网_快递空包网站_旺旺照妖镜",
          "findTime": "2019/8/19"
        },
        {
          "url": "xuyi365.net",
          "title": "盱眙论坛-盱眙365网-盱眙第一人气社区-我爱盱眙每一天！",
          "findTime": "2019/8/19"
        },
        {
          "url": "xtrczp.com",
          "title": "新泰人才招聘网-新泰人才网上求职、企业招聘平台！",
          "findTime": "2019/8/19"
        }
      ]
    }
  ],
  [
    "/coordination/getDisposeList",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "account": [
          [
            {
              "name": "账号",
              "value": "wxid_0k08rrr9jf7822"
            },
            {
              "name": "关联工单",
              "value": "RB52654163453245"
            },
            {
              "name": "账户类型",
              "value": "微信"
            },
            {
              "name": "举报类型",
              "value": "兼职诈骗"
            },
            {
              "name": "举报时间",
              "value": "2019-08-25"
            },
            {
              "name": "处置结果",
              "value": "封号"
            }
          ],
          [
            {
              "name": "账号",
              "value": "cxvip88888"
            },
            {
              "name": "关联工单",
              "value": "RB526541637667442"
            },
            {
              "name": "账户类型",
              "value": "微信"
            },
            {
              "name": "举报类型",
              "value": "网络赌博"
            },
            {
              "name": "举报时间",
              "value": "2019-08-25"
            },
            {
              "name": "处置结果",
              "value": "封号"
            }
          ],
          [
            {
              "name": "账号",
              "value": "32970268"
            },
            {
              "name": "关联工单",
              "value": "RB52654163998121"
            },
            {
              "name": "账户类型",
              "value": "QQ"
            },
            {
              "name": "举报类型",
              "value": "兼职诈骗"
            },
            {
              "name": "举报时间",
              "value": "2019-08-25"
            },
            {
              "name": "处置结果",
              "value": "封号"
            }
          ],
          [
            {
              "name": "账号",
              "value": "wxid_vi8lc1doitya12"
            },
            {
              "name": "关联工单",
              "value": "RB52654165546665"
            },
            {
              "name": "账户类型",
              "value": "微信"
            },
            {
              "name": "举报类型",
              "value": "网络赌博"
            },
            {
              "name": "举报时间",
              "value": "2019-08-25"
            },
            {
              "name": "处置结果",
              "value": "封号"
            }
          ],
          [
            {
              "name": "账号",
              "value": "487443346"
            },
            {
              "name": "关联工单",
              "value": "RB52654165546392"
            },
            {
              "name": "账户类型",
              "value": "QQ"
            },
            {
              "name": "举报类型",
              "value": "兼职诈骗"
            },
            {
              "name": "举报时间",
              "value": "2019-08-25"
            },
            {
              "name": "处置结果",
              "value": "封号"
            }
          ],
          [
            {
              "name": "账号",
              "value": "973973210"
            },
            {
              "name": "关联工单",
              "value": "RB52654165546114"
            },
            {
              "name": "账户类型",
              "value": "QQ"
            },
            {
              "name": "举报类型",
              "value": "兼职诈骗"
            },
            {
              "name": "举报时间",
              "value": "2019-08-25"
            },
            {
              "name": "处置结果",
              "value": "封号"
            }
          ],
          [
            {
              "name": "账号",
              "value": "975475019"
            },
            {
              "name": "关联工单",
              "value": "RB52654165546861"
            },
            {
              "name": "账户类型",
              "value": "QQ"
            },
            {
              "name": "举报类型",
              "value": "兼职诈骗"
            },
            {
              "name": "举报时间",
              "value": "2019-08-25"
            },
            {
              "name": "处置结果",
              "value": "封号"
            }
          ]
        ],
        "domain": [
          [
            {
              "name": "域名",
              "value": "05ql.com"
            },
            {
              "name": "关联工单",
              "value": "RB52654163865563"
            },
            {
              "name": "备案号",
              "value": "苏ICP备19033544号-13"
            },
            {
              "name": "诈骗类型",
              "value": "高日化金融诈骗"
            },
            {
              "name": "发现时间",
              "value": "2019-07-25"
            },
            {
              "name": "接入IP",
              "value": "42.156.141.13"
            },
            {
              "name": "基础企业",
              "value": "阿里云/电信/联通/移动/铁通/教育网"
            },
            {
              "name": "处置结果",
              "value": ""
            }
          ],
          [
            {
              "name": "域名",
              "value": "jypt.nncj.com"
            },
            {
              "name": "关联工单",
              "value": "RB52654163866553"
            },
            {
              "name": "备案号",
              "value": "未备案"
            },
            {
              "name": "诈骗类型",
              "value": "高杠杆投资诈骗"
            },
            {
              "name": "发现时间",
              "value": "2019-07-25"
            },
            {
              "name": "接入IP",
              "value": "116.207.118.74"
            },
            {
              "name": "基础企业",
              "value": "电信"
            },
            {
              "name": "处置结果",
              "value": ""
            }
          ],
          [
            {
              "name": "域名",
              "value": "weizil.com"
            },
            {
              "name": "关联工单",
              "value": "RB52654163867656"
            },
            {
              "name": "备案号",
              "value": "豫ICP备18039215号-1"
            },
            {
              "name": "诈骗类型",
              "value": "刷单诈骗"
            },
            {
              "name": "发现时间",
              "value": "2019-07-25"
            },
            {
              "name": "接入IP",
              "value": "106.15.201.233"
            },
            {
              "name": "基础企业",
              "value": "阿里云/电信/联通/移动/铁通/教育网"
            },
            {
              "name": "处置结果",
              "value": ""
            }
          ],
          [
            {
              "name": "域名",
              "value": "maihuamei.com"
            },
            {
              "name": "关联工单",
              "value": "RB52654163869981"
            },
            {
              "name": "备案号",
              "value": "QQ"
            },
            {
              "name": "诈骗类型",
              "value": "刷单诈骗"
            },
            {
              "name": "发现时间",
              "value": "2019-07-25"
            },
            {
              "name": "接入IP",
              "value": "118.31.38.43"
            },
            {
              "name": "基础企业",
              "value": "阿里云/电信/联通/移动/铁通/教育网"
            },
            {
              "name": "处置结果",
              "value": ""
            }
          ],
          [
            {
              "name": "域名",
              "value": "jxytdl.com"
            },
            {
              "name": "关联工单",
              "value": "RB52654163867768"
            },
            {
              "name": "备案号",
              "value": "辽ICP备17016176号-1"
            },
            {
              "name": "诈骗类型",
              "value": "高收益理财诈骗"
            },
            {
              "name": "发现时间",
              "value": "2019-07-25"
            },
            {
              "name": "接入IP",
              "value": "39.106.138.116"
            },
            {
              "name": "基础企业",
              "value": "电信/联通"
            },
            {
              "name": "处置结果",
              "value": ""
            }
          ]
        ]
      }
    }
  ],
  [
    "/home/getOverview",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": [
        {
          "icon": "iconweixin",
          "label": "涉诈微信QQ号总量",
          "value": "92,917",
          "unit": ""
        },
        {
          "icon": "iconshouji",
          "label": "涉诈APP总量",
          "value": "14,147",
          "unit": ""
        },
        {
          "icon": "iconyuming-mianxing",
          "label": "涉诈网站总量",
          "value": "1,007,289",
          "unit": ""
        },
        {
          "icon": "iconlianjie",
          "label": "涉诈URL总量",
          "value": "16,112,106",
          "unit": ""
        },
        {
          "icon": "iconduanxin",
          "label": "涉诈短信总量",
          "value": "175,012",
          "unit": ""
        }
      ]
    }
  ],
  [
    "/home/getDisposedType",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesData": [
          {
            "name": "交易诈骗",
            "value": 39.6
          },
          {
            "name": "兼职诈骗",
            "value": 13.5
          },
          {
            "name": "交友诈骗",
            "value": 11.8
          },
          {
            "name": "返利诈骗",
            "value": 9.9
          },
          {
            "name": "低价利诱诈骗",
            "value": 7.6
          },
          {
            "name": "金融信用诈骗",
            "value": 5.6
          },
          {
            "name": "仿冒诈骗",
            "value": 5.2
          },
          {
            "name": "色情诈骗",
            "value": 5
          },
          {
            "name": "免费送诈骗",
            "value": 1
          },
          {
            "name": "盗号诈骗",
            "value": 0.8
          }
        ]
      }
    }
  ],
  [
    "/home/getReportTrend",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "legendData": [
          "当月举报总量"
        ],
        "seriesData": [
          [
            6900,
            23759,
            26931,
            13343,
            10750,
            3404
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ],
  [
    "/home/getFraudAppType",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesData": [
          {
            "value": 0.4783,
            "name": "办证诈骗"
          },
          {
            "value": 0.2174,
            "name": "金融投资诈骗"
          },
          {
            "value": 0.1304,
            "name": "赌博诈骗"
          },
          {
            "value": 0.0869,
            "name": "贷款诈骗"
          },
          {
            "value": 0.0435,
            "name": "代办信用卡诈骗"
          },
          {
            "value": 0.0435,
            "name": "社保诈骗"
          }
        ]
      }
    }
  ],
  [
    "/home/getAppMarketRank",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesName": "涉诈APP总量",
        "seriesData": [
          16,
          37,
          68,
          120,
          124
        ],
        "categoryData": [
          "56手机游戏",
          "99软件园",
          "小米应用市场",
          "系统天堂",
          "360手机助手"
        ]
      }
    }
  ],
  [
    "/home/getDomainTrend",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "legendData": [
          "当月总量"
        ],
        "seriesData": [
          [
            74024,
            22265,
            265394,
            80565,
            154726,
            82240,
            57696,
            82379
          ]
        ],
        "categoryData": [
          "201901",
          "201902",
          "201903",
          "201904",
          "201905",
          "201906",
          "201907",
          "201908"
        ]
      }
    }
  ],
  [
    "/home/getFraudWebsiteType",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesData": [
          {
            "name": "虚假信息诈骗",
            "value": 5878
          },
          {
            "name": "刷单诈骗",
            "value": 4210
          },
          {
            "name": "恶意木马诈骗",
            "value": 3062
          },
          {
            "name": "代孕求子诈骗",
            "value": 1061
          },
          {
            "name": "风险购物诈骗",
            "value": 411
          },
          {
            "name": "保健品销售诈骗",
            "value": 151
          },
          {
            "name": "其他",
            "value": 331
          }
        ]
      }
    }
  ],
  [
    "/home/getWebsiteCountryRank",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesName": "接入总量",
        "seriesData": [
          8439,
          14498,
          15951,
          23951,
          502618
        ],
        "categoryData": [
          "韩国",
          "南非",
          "菲律宾",
          "日本",
          "美国"
        ]
      }
    }
  ],
  [
    "/home/getLiquidFillData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "name": "境外接入率",
        "value": 0.6996
      }
    }
  ],
  [
    "/home/getMapData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "seriesData": [
          {
            "name": "吉林",
            "value": 3918914
          },
          {
            "name": "河南",
            "value": 2116730
          },
          {
            "name": "福建",
            "value": 1441649
          },
          {
            "name": "山东",
            "value": 1306185
          },
          {
            "name": "黑龙江",
            "value": 583138
          },
          {
            "name": "云南",
            "value": 437471
          },
          {
            "name": "浙江",
            "value": 296430
          },
          {
            "name": "海南",
            "value": 229186
          },
          {
            "name": "天津",
            "value": 176792
          },
          {
            "name": "湖南",
            "value": 147714
          },
          {
            "name": "四川",
            "value": 125580
          },
          {
            "name": "陕西",
            "value": 96279
          },
          {
            "name": "江苏",
            "value": 87925
          },
          {
            "name": "青海",
            "value": 78136
          },
          {
            "name": "湖北",
            "value": 53428
          },
          {
            "name": "广东",
            "value": 39801
          },
          {
            "name": "上海",
            "value": 37707
          },
          {
            "name": "甘肃",
            "value": 32997
          },
          {
            "name": "重庆",
            "value": 25595
          },
          {
            "name": "辽宁",
            "value": 14971
          },
          {
            "name": "安徽",
            "value": 14331
          },
          {
            "name": "江西",
            "value": 8269
          },
          {
            "name": "山西",
            "value": 7929
          },
          {
            "name": "贵州",
            "value": 7426
          },
          {
            "name": "新疆",
            "value": 6017
          },
          {
            "name": "北京",
            "value": 2519
          },
          {
            "name": "河北",
            "value": 2282
          },
          {
            "name": "广西",
            "value": 1671
          },
          {
            "name": "西藏",
            "value": 1260
          },
          {
            "name": "宁夏",
            "value": 1190
          },
          {
            "name": "内蒙古",
            "value": 500
          }
        ]
      }
    }
  ],
  [
    "/monitor/getWarningTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "domain": "gsyd.vcza.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "y.kanfangge.cn",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "d.gu92f.cn",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "s.youhuib.cn",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "paph.acyl217.vip",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "ya.drkj.wang",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "ezkj.jiuv.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "hcjr.njiu.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "msjr6.wd123.me",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        },
        {
          "domain": "rrdsdfc.aslkjcds.xyz",
          "fraudType": "贷款诈骗",
          "province": "河北",
          "time": "2019-08-21"
        }
      ]
    }
  ],
  [
    "/monitor/getDissuadeTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "dissuadeObject": "13265****24",
          "location": "朝阳区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        },
        {
          "dissuadeObject": "15842****65",
          "location": "朝阳区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        },
        {
          "dissuadeObject": "15842****23",
          "location": "丰台区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        },
        {
          "dissuadeObject": "15842****78",
          "location": "海淀区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        },
        {
          "dissuadeObject": "17724****22",
          "location": "丰台区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        },
        {
          "dissuadeObject": "17788****66",
          "location": "朝阳区",
          "simulateObject": "仿冒建设银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        },
        {
          "dissuadeObject": "15848****99",
          "location": "海淀区",
          "simulateObject": "仿冒工商银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        },
        {
          "dissuadeObject": "15845****39",
          "location": "朝阳区",
          "simulateObject": "仿冒平安银行",
          "case": "网银升级类",
          "occurrenceTime": "2019-08-19"
        }
      ]
    }
  ],
  [
    "/monitor/getNetAccountMonitorTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "account": "875994707",
          "type": "QQ",
          "source": "wangzhuan518.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "2242245432",
          "type": "QQ",
          "source": "888bfw.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "2403846943",
          "type": "QQ",
          "source": "zf158.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "3067800081",
          "type": "QQ",
          "source": "fangjs.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "78246780",
          "type": "QQ",
          "source": "888soso.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "2403846943",
          "type": "QQ",
          "source": "zf158.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "3067800081",
          "type": "QQ",
          "source": "fangjs.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "2242245432",
          "type": "QQ",
          "source": "888bfw.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "78246780",
          "type": "QQ",
          "source": "888soso.com",
          "findTime": "2019-08-21"
        },
        {
          "account": "2403846943",
          "type": "QQ",
          "source": "zf158.com",
          "findTime": "2019-08-21"
        }
      ]
    }
  ],
  [
    "/monitor/getAppMonitorTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "appName": "天天娃娃机",
          "label": "中奖",
          "findTime": "2019-08-20"
        },
        {
          "appName": "WIFI网络电话",
          "label": "打电话(2);任意拨打(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "速缘",
          "label": "打电话(3);呼死你(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "平安彩票HD(1.0.0)",
          "label": "中奖(2);积分(3);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "爱投彩票(1.17)",
          "label": "中奖(2);银行卡(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "果宝特攻王者联盟",
          "label": "返利(4);购物卡(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "熊出没之机甲熊大",
          "label": "中奖(1);购物卡(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "铠甲勇士英雄归来",
          "label": "返利(1);购物卡(2);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "铠甲勇士之英雄传说",
          "label": "中奖(1);返利(1);购物卡(1);",
          "findTime": "2019/8/20"
        },
        {
          "appName": "狸猫抓娃娃",
          "label": "中奖(1);包邮(1);",
          "findTime": "2019/8/20"
        }
      ]
    }
  ],
  [
    "/monitor/getWebsiteMonitorTableData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "url": "xiaobaiss.com",
          "title": "小白蜀黍网赚 - 把网赚写成日记，带你了解网络赚钱的那些事！",
          "findTime": "2019/8/20"
        },
        {
          "url": "csds.cc",
          "title": "QQ刷赞网站 - 抖音刷粉丝_快手刷双击赞,刷播放量平台_在线刷赞刷粉丝网站-超速代刷网",
          "findTime": "2019/8/20"
        },
        {
          "url": "v7720.com",
          "title": "葡京娱乐场-打造线上博彩娱乐场，相信葡京娱乐场-相信品牌的力量--打造天下第一诚信平台！提款三分钟到账！",
          "findTime": "2019/8/20"
        },
        {
          "url": "xndama.com",
          "title": "信诺打码 - 验证码代答|远程答题|人工代答|远程代答",
          "findTime": "2019/8/19"
        },
        {
          "url": "xnph66.com",
          "title": "小牛普惠官网_普惠金融信息服务平台",
          "findTime": "2019/8/19"
        },
        {
          "url": "xygtea.com",
          "title": "闲品茶网 一家只做正品的普洱茶网上商城",
          "findTime": "2019/8/19"
        },
        {
          "url": "yahui.cc",
          "title": "亚汇网_全球股票基金财经资讯_专业股票资讯网",
          "findTime": "2019/8/19"
        },
        {
          "url": "vip579.cn",
          "title": "速递空包网速递空包网_www.vip579.cn_拼多多空包_京东空包_淘宝空包_快递单号购买_空包代发_速递联盟_拼多多刷单_拼多多放单_快递空包网_快递空包网站_旺旺照妖镜",
          "findTime": "2019/8/19"
        },
        {
          "url": "xuyi365.net",
          "title": "盱眙论坛-盱眙365网-盱眙第一人气社区-我爱盱眙每一天！",
          "findTime": "2019/8/19"
        },
        {
          "url": "xtrczp.com",
          "title": "新泰人才招聘网-新泰人才网上求职、企业招聘平台！",
          "findTime": "2019/8/19"
        }
      ]
    }
  ],
  [
    "/monitor/getWarningList",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "title": "老年人防诈骗 先熟悉骗局套路",
          "findTime": "2019/8/20"
        },
        {
          "title": "意外！电讯诈骗年轻人更易上当",
          "findTime": "2019/8/20"
        },
        {
          "title": "双十一将至 你该如何捂紧钱包严防诈骗？",
          "findTime": "2019/8/20"
        },
        {
          "title": "旅游变医疗诈骗？涉案近10亿元！特大海外医疗诈骗案告破",
          "findTime": "2019/8/20"
        },
        {
          "title": "诈骗新招：“美女博主”吸引粉丝后实施转账诈骗",
          "findTime": "2019/8/20"
        },
        {
          "title": "百亚平台诈骗案结案 柯桥公安现场发还赃款108万",
          "findTime": "2019/8/20"
        },
        {
          "title": "“双十一”要警惕网络诈骗",
          "findTime": "2019/8/20"
        },
        {
          "title": "银行卡诈骗",
          "findTime": "2019/8/20"
        },
        {
          "title": "诈骗医保大案件折射大漏洞",
          "findTime": "2019/8/20"
        },
        {
          "title": "急用钱却落入诈骗陷阱 小伙下载贷款APP被骗一万六",
          "findTime": "2019/8/20"
        }
      ]
    }
  ],
  [
    "/monitor/getMapData",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": [
        {
          "name": "美国",
          "value": 95
        },
        {
          "name": "英国",
          "value": 90
        },
        {
          "name": "意大利",
          "value": 80
        },
        {
          "name": "澳大利亚",
          "value": 70
        },
        {
          "name": "韩国",
          "value": 70
        },
        {
          "name": "新西兰",
          "value": 70
        },
        {
          "name": "法国",
          "value": 70
        }
      ]
    }
  ],
  [
    "/special/suspectedVictim",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": [
        {
          "name": "广东",
          "value": 31
        },
        {
          "name": "四川",
          "value": 22
        },
        {
          "name": "浙江",
          "value": 19
        },
        {
          "name": "湖北",
          "value": 17
        },
        {
          "name": "河南",
          "value": 5
        },
        {
          "name": "其他",
          "value": 6
        }
      ]
    }
  ],
  [
    "/special/liveWebRank",
    {
      "isNormal": true,
      "errorType": 0,
      "returnModel": {
        "legendData": [
          "赌博杀猪盘",
          "小额贷款手续费诈骗",
          "虚假彩票合买诈骗",
          "交友投资诈骗",
          "私盘荐股诈骗"
        ],
        "seriesData": [
          [
            276,
            383,
            698,
            737,
            757,
            514
          ],
          [
            192,
            236,
            627,
            483,
            423,
            267
          ],
          [
            101,
            132,
            178,
            212,
            246,
            273
          ],
          [
            392,
            428,
            451,
            286,
            279,
            243
          ],
          [
            47,
            52,
            183,
            249,
            212,
            183
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ],
  [
    "/special/baseInfoList",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": {
        "gambleList1": [
          {
            "icon": "iconlianjie",
            "label": "当前存活域名",
            "value": "125",
            "unit": "个"
          },
          {
            "icon": "iconyuming",
            "label": "域名总量",
            "value": "2987",
            "unit": "个"
          },
          {
            "icon": "icondiqiu",
            "label": "域名平均存活周期",
            "value": "7.9",
            "unit": "天"
          },
          {
            "icon": "iconduanxin",
            "label": "总访问量",
            "value": "32089784",
            "unit": "次"
          },
          {
            "icon": "iconzhuji",
            "label": "接入主机总量",
            "value": "1675",
            "unit": "个"
          }
        ],
        "gambleList2": [
          {
            "icon": "iconlianjie",
            "label": "当前存活域名",
            "value": "189",
            "unit": "个"
          },
          {
            "icon": "iconyuming",
            "label": "域名总量",
            "value": "2214",
            "unit": "个"
          },
          {
            "icon": "icondiqiu",
            "label": "域名平均存活周期",
            "value": "15.1",
            "unit": "天"
          },
          {
            "icon": "iconduanxin",
            "label": "总访问量",
            "value": "3845282",
            "unit": "次"
          },
          {
            "icon": "iconzhuji",
            "label": "接入主机总量",
            "value": "2978",
            "unit": "个"
          }
        ],
        "gambleList3": [
          {
            "icon": "iconlianjie",
            "label": "当前存活域名",
            "value": "133",
            "unit": "个"
          },
          {
            "icon": "iconyuming",
            "label": "域名总量",
            "value": "1421",
            "unit": "个"
          },
          {
            "icon": "icondiqiu",
            "label": "域名平均存活周期",
            "value": "7.2",
            "unit": "天"
          },
          {
            "icon": "iconduanxin",
            "label": "总访问量",
            "value": "84514804",
            "unit": "次"
          },
          {
            "icon": "iconzhuji",
            "label": "接入主机总量",
            "value": "834",
            "unit": "个"
          }
        ]
      }
    }
  ],
  [
    "/special/gambleWebOutside",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": [
        {
          "value": 173,
          "name": "境内接入"
        },
        {
          "value": 827,
          "name": "境外接入"
        }
      ]
    }
  ],
  [
    "/special/gambleLiveDomain",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": {
        "legendData": [
          "存活域名数量趋势"
        ],
        "seriesData": [
          [
            276,
            383,
            698,
            737,
            757,
            514
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ],
  [
    "/special/loanFraudWebOutside",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": [
        {
          "value": 21.2,
          "name": "境内接入"
        },
        {
          "value": 798,
          "name": "境外接入"
        }
      ]
    }
  ],
  [
    "/special/loanFraudleLiveDomain",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": {
        "legendData": [
          "存活域名数量趋势"
        ],
        "seriesData": [
          [
            192,
            236,
            627,
            483,
            423,
            267
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ],
  [
    "/special/lotteryFraudWebOutside",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": [
        {
          "value": 186,
          "name": "境内接入"
        },
        {
          "value": 814,
          "name": "境外接入"
        }
      ]
    }
  ],
  [
    "/special/lotteryFraudleLiveDomain",
    {
      "errorType": 0,
      "isNormal": true,
      "returnModel": {
        "legendData": [
          "存活域名数量趋势"
        ],
        "seriesData": [
          [
            101,
            132,
            178,
            212,
            246,
            273
          ]
        ],
        "categoryData": [
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月"
        ]
      }
    }
  ]
]