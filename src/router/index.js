import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // mode: 'hash',
  routes: [
    {
      path: '/Index',
      alias: '/',
      name: 'Home',
      hasChild:false,
      component: () => import('@/components/views/Home'),
      meta: {
        showFlag: false,
        keepAlive : false,
        menuName : 'Login'
      }
    },
    
    {
      path: '/Login',
      name: 'Login',
      hasChild:false,
      component: () => import('@/components/views/Login'),
      meta: {
        showFlag: false,
        keepAlive : false,
        menuName : 'Login'
      }
    },
    // {
    //   path: '/Register',
    //   name: 'Register',
    //   hasChild:false,
    //   component: () => import('@/components/views/Register'),
    //   meta: {
    //     showFlag: false,
    //     keepAlive : false,
    //     menuName : 'Login'
    //   }
    // },
    
    {
      path: '/AccessDenied',
      name: 'AccessDenied',
      hasChild:false,
      component: () => import('@/components/common/AccessDenied.vue'),
      meta: {
        showFlag: false,
        keepAlive : true,
        menuName : 'Login'
      }
    },

    {
      path: '/Paper',
      name: 'Paper',
      component: () => import('@/components/views/paperManagement/Paper/Paper'),
      meta: {
        keepAlive : false,
      }
    },
    {
      path: '/Exam',
      name: 'Exam',
      component: () => import('@/components/views/paperManagement/Paper/Exam'),
      meta: {
        keepAlive : false,
      }
    },
    {
      path: '/QueryExam',
      name: 'QueryExam',
      component: () => import('@/components/views/examManagement/QueryExamRecord/Exam'),
      meta: {
        keepAlive : false,
      }
    },
    {
      path: '/JudgePaper',
      name: 'JudgePaper',
      component: () => import('@/components/views/examManagement/Judge/Paper'),
      meta: {
        showFlag: false,
        keepAlive : false,
      }
    },

    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/components/common/NotFound.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/forgetPass',
      name: 'forgetPass',
      component: () => import('@/components/views/forgetPass'),
      meta: {
        showFlag: false,
        keepAlive : false,
      }
    },
    {
      path: '/reportDetail',
      name: 'reportDetail',
      component: () => import('@/components/views/examManagement/Report/reportDetail'),
      meta: {
        showFlag: false,
        keepAlive : false,
        menuName : '答卷管理'
      }
    },
    {
      path: "/Home",
      name: "Home",
      component: () => import("@/components/views/examManagement/phone/Home")
    },
    {
      path: "/examLogin",
      name: "examLogin",
      component: () => import("@/components/views/examManagement/phone/Login")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/components/views/examManagement/phone/Register")
    },
    {
      path: "/faceRec",
      name: "faceRec",
      component: () => import("@/components/views/examManagement/phone/FaceRec")
    },
    {
      path: "/phoneExam",
      name: "phoneExam",
      component: () => import("@/components/views/examManagement/phone/Exam")
    },
    {
      path: "/startExam",
      name: "startExam",
      component: () => import("@/components/views/examManagement/phone/StartExam")
    },
    {
      path: "/endExam",
      name: "endExam",
      component: () => import("@/components/views/examManagement/phone/EndExam")
    },
    {
      path: "/ExamRecordComponent",
      name: "ExamRecordComponent",
      component: () => import("@/components/views/examManagement/QueryExamRecord/ExamRecordComponent")
    },
   
    {
      path: '/systemModule',
      menuName:'系统管理',
      hasChild:false,
      component: () => import('@/components/views/SystemManagement/Main'),
      // meta: {
      //   keepAlive: true
      // },
      children:[
        {
          path: 'resource',
          name: 'ResourceMonitor',
          component: () => import('@/components/views/SystemManagement/ResourceMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '资源管理'
          }
        }
        ,
        {
          path: 'department',
          name: 'DepartmentMonitor',
          component: () => import('@/components/views/SystemManagement/DepartmentMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '部门管理'
          }
        }
        ,
        {
          path: 'user',
          name: 'UserMonitor',
          component: () => import('@/components/views/SystemManagement/UserMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '用户管理'
          }
        }
        ,
        {
          path: 'systemParam',
          name: 'SystemParamMonitor',
          component: () => import('@/components/views/SystemManagement/SystemParamMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '参数管理'
          }
        }
        ,
        {
          path: 'role',
          name: 'RoleMonitor',
          component: () => import('@/components/views/SystemManagement/RoleMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '角色管理'
          }
        }
        ,
        {
          path: 'position',
          name: 'PositionMonitor',
          component: () => import('@/components/views/SystemManagement/PositionMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '职位管理'
          }
        }
        ,
        {
          path: 'organization',
          name: 'OrganizationMonitor',
          component: () => import('@/components/views/SystemManagement/OrganizationMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '组织管理'
          }
        }
        ,
        {
          path: 'company',
          name: 'CompanyMonitor',
          component: () => import('@/components/views/SystemManagement/CompanyMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '公司管理'
          }
        }
        ,
        {
          path: 'userOnlineInfo',
          name: 'UserOnlineInfoMonitor',
          component: () => import('@/components/views/SystemManagement/UserOnlineInfoMonitor.vue'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '用户在线管理'
          }
        }
        ,
        {
          path: 'dictionary',
          name: 'DictionaryMonitor',
          component: () => import('@/components/views/SystemManagement/DictionaryMonitor'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '数据字典管理'
          }
        }
        , 
      ]
    }
    ,
    {
      menuName:'试卷管理',
      hasChild:false,
      path : '/paperManage',
      component: () => import('@/components/views/main/main'),
      children:[
        {
          path: 'Combination',
          name: 'Combination',
          component: () => import('@/components/views/paperManagement/Combination/Parent'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '组卷'
          }
        },
        {
          path: 'Download',
          name: 'Download',
          component: () => import('@/components/views/paperManagement/Download/Download'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '下载试卷'
          }
        },
        {
          path: 'Upload',
          name: 'Upload',
          component: () => import('@/components/views/paperManagement/Upload/Upload'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '上传试卷'
          }
        },
        {
          path: 'MaintainPaper',
          name: 'MaintainPaper',
          component: () => import('@/components/views/paperManagement/MaintainPaper/MaintainPaper'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '维护试卷'
          }
        },
        {
          path: 'MaintainTemplatego',
          name: 'MaintainTemplatego',
          component: () => import('@/components/views/paperManagement/MaintainTemplatego/MaintainTemplatego'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '试卷模板管理'
          }
        }
      ]
    },
    {
      menuName:'基础数据',
      hasChild:false,
      path : '/basedata',
      component: () => import('@/components/views/main/main'),
      children:[
        {
          path: 'category',
          name: 'category',
          component: () => import('@/components/views/basedataManagement/category'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '题目类别管理'
          }
        },
        {
          path: 'type',
          name: 'type',
          component: () => import('@/components/views/basedataManagement/type'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '题目类型管理'
          }
        },
        {
          path: 'combExam',
          name: 'combExam',
          component: () => import('@/components/views/basedataManagement/combExamConfig'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '组卷配置项管理'
          }
        },
        {
          path: 'subject',
          name: 'subject',
          component: () => import('@/components/views/basedataManagement/subject'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '题目管理'
          }
        },
      ]
    },
    {
      menuName:'考试管理',
      hasChild:false,
      path : '/exam',
      component: () => import('@/components/views/main/main'),
      children:[
        {
          path: 'ExamPublish',
          name: 'ExamPublish',
          component: () => import('@/components/views/examManagement/Publish/Exam'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '考试发布管理'
          }
        },
        {
          path: 'ExamRecord',
          name: 'ExamRecord',
          component: () => import('@/components/views/examManagement/QueryExamRecord/ExamRecord'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '答卷查询'
          }
        },
        
        {
          path: 'Report',
          name: 'Report',
          component: () => import('@/components/views/examManagement/Report/report'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '考试报表'
          }
        },
        {
          path: 'Judge',
          name: 'Judge',
          component: () => import('@/components/views/examManagement/Judge/Judge'),
          meta: {
            showFlag: false,
            keepAlive : false,
            menuName : '评卷管理'
          }
        },
        
      ]
    },

  ]
})
