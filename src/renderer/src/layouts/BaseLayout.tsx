import { ChildProps } from '@renderer/entitys/other.entity'
import { useHistory } from '@renderer/libs/router'
import { AppStore, use_appstore } from '@renderer/models/app.model'
import { useEffect, useRef, useState } from 'react'
import { webToManMsg } from '@common/entitys/ipcmsg.entity'
import { PagePath } from '@common/entitys/page.entity'
import { ConsoleLog } from '@renderer/libs/Console'
import { LastUserInfo } from '@common/entitys/user.entity'
import { Button, message } from 'antd'
import { getAllVault, getAllVaultItem, ipc_call } from '@renderer/libs/tools/other'
import { AppsetStore, use_appset } from '@renderer/models/appset.model'

function BaseLayout(props: ChildProps): JSX.Element {
  const [messageApi, messageContex] = message.useMessage()
  const history = useHistory()
  const appset = use_appset() as AppsetStore
  const appstore = use_appstore() as AppStore
  const appstoreRef = useRef(appstore)
  ConsoleLog.LogInfo('baselayout render')
  useEffect(() => {
    if (appset.initOK) initApp()
  }, [appset.initOK])

  useEffect(() => {
    const timer = setInterval(() => {
      if (appstoreRef.current.IsLock()) {
        history.push(PagePath.Lock)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  async function initApp() {
    await ipc_call<LastUserInfo>(webToManMsg.GetLastUserInfo)
      .then(async (userinfo) => {
        appstore.SetUser(userinfo.user)
        if (userinfo.has_init_key) {
          const havelogin = await ipc_call<boolean>(webToManMsg.HasLogin).catch((error) => {
            messageApi.error(appset.lang.getText(`err.${error.code}`))
          })
          if (havelogin == false) {
            history.replace(PagePath.Login)
          }
        } else {
          history.replace(PagePath.register)
          return
        }
      })
      .catch((error) => {
        messageApi.error(appset.lang.getText(`err.${error.code}`))
        history.replace(PagePath.register)
      })
  }

  useEffect(() => {
    initAllData()
  }, [appstore.cur_user, appstore.hasLogin])

  async function initAllData() {
    if (appstore.hasLogin) {
      await getAllVault(appstore, appset.lang, messageApi)
      await getAllVaultItem(appstore, appset.lang, messageApi)
    }
  }

  return (
    <div>
      {/* <Button
        onClick={() => {
          history.push(PagePath.Lock)
        }}
      >
        go to lock
      </Button> */}
      {messageContex}
      {props.children}
    </div>
  )
}

export default BaseLayout
