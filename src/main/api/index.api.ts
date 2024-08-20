import { ipcMain, app } from 'electron'
import AppModel from '../models/app.model'
import { MainToWebMsg, webToManMsg } from '../../common/entitys/ipcmsg.entity'
import { WhereDef } from '@common/entitys/db.entity'
import { Vault } from '@common/entitys/vault.entity'
import { VaultItem } from '@common/entitys/vault_item.entity'
import { renderViewType } from '@common/entitys/app.entity'

export function initAllApi() {
  //system
  ipcMain.handle(webToManMsg.SetLang, (_, lang) => {
    AppModel.getInstance().changeLang(lang)
  })
  ipcMain.handle(webToManMsg.GetLang, () => {
    return AppModel.getInstance().CurLang()
  })

  ipcMain.handle(webToManMsg.isLock, () => {
    return AppModel.getInstance().IsLock()
  })

  ipcMain.handle(webToManMsg.LockApp, () => {
    AppModel.getInstance().LockApp()
  })

  ipcMain.handle(webToManMsg.IsSystemInit, () => {
    return AppModel.getInstance().IsSystemInit()
  })

  ipcMain.handle(webToManMsg.ResizeWindow, (_, viewtype: renderViewType, width, height) => {
    if (viewtype == renderViewType.Mainview) AppModel.getInstance().mainwin?.setSize(width, height)
    else if (viewtype == renderViewType.Quickview)
      AppModel.getInstance().quickwin?.setSize(width, height)
  })

  ipcMain.handle(webToManMsg.UpdateTrayMenu, (_, setinfo) => {
    AppModel.getInstance().my_tray?.updateMenu(setinfo)
  })

  ipcMain.handle(webToManMsg.showWindows, (_, viewtype: renderViewType, showorHide: boolean) => {
    if (viewtype == renderViewType.Mainview) AppModel.getInstance().mainwin?.showOrHide(showorHide)
    else if (viewtype == renderViewType.Quickview)
      AppModel.getInstance().quickwin?.showOrHide(showorHide)
  })

  ipcMain.handle(webToManMsg.Backup_alidrive, () => {
    return AppModel.getInstance().BackupByAliyun()
  })

  ipcMain.handle(webToManMsg.Recover_alidrive, (_, filename) => {
    return AppModel.getInstance().RecoverByAliyun(filename)
  })

  ipcMain.handle(webToManMsg.GetAllBackups_alidrive, async () => {
    return await AppModel.getInstance().GetAliyunBackupList()
  })

  ipcMain.handle(webToManMsg.ShowVaultItem, (_, vault_id, vault_item_id) => {
    const mainwin = AppModel.getInstance().mainwin
    if (mainwin) {
      mainwin.show()
      mainwin.content.send(MainToWebMsg.ShowVaulteItem, vault_id, vault_item_id)
    }
  })

  ipcMain.handle(webToManMsg.AutoFill, (_, info) => {
    return AppModel.getInstance().AutoFill(info)
  })

  ipcMain.handle(webToManMsg.getMousePos, () => {
    return AppModel.getInstance().getScreenPoint()
  })

  ipcMain.handle(webToManMsg.ShortCutKeyChange, () => {
    AppModel.getInstance().initGlobalShortcut()
  })
  ipcMain.handle(webToManMsg.CheckShortKey, (_, key) => {
    return AppModel.getInstance().IsKeyRegisted(key)
  })

  ipcMain.handle(webToManMsg.Backup_local, async () => {
    return await AppModel.getInstance().BackupSystem()
  })

  ipcMain.handle(webToManMsg.Recover_local, async () => {
    return await AppModel.getInstance().RecoverSystemFromBackup()
  })

  ipcMain.handle(webToManMsg.QuitAPP, () => {
    AppModel.getInstance().Quit()
  })

  ipcMain.handle(webToManMsg.RestartApp, () => {
    app.relaunch()
  })

  ipcMain.handle(webToManMsg.CloseDb, async () => {
    return await AppModel.getInstance().db_helper.CloseDB()
  })

  ipcMain.handle(webToManMsg.OpenDb, async () => {
    return await AppModel.getInstance().db_helper.OpenDb()
  })

  //user
  ipcMain.handle(webToManMsg.getCurUserInfo, () => {
    return AppModel.getInstance().curUserInfo()
  })

  ipcMain.handle(webToManMsg.isLogin, () => {
    return AppModel.getInstance().IsLogin()
  })
  ipcMain.handle(webToManMsg.Login, async (_, info) => {
    return await AppModel.getInstance().user?.Login(info)
  })
  ipcMain.handle(webToManMsg.Register, async (_, info) => {
    return await AppModel.getInstance().user?.Register(info)
  })
  ipcMain.handle(webToManMsg.Logout, async () => {
    return await AppModel.getInstance().user?.Logout()
  })
  ipcMain.handle(webToManMsg.getAllUser, async () => {
    return await AppModel.getInstance().user?.GetAll()
  })
  ipcMain.handle(webToManMsg.GetLastUserInfo, async () => {
    return await AppModel.getInstance().user?.GetLastUserInfo()
  })
  ipcMain.handle(webToManMsg.UpdateUser, async (_, user) => {
    return await AppModel.getInstance().user?.UpdateOne2(user, true)
  })

  //valut
  ipcMain.handle(webToManMsg.GetAllValuts, async (_, cond: WhereDef<Vault>) => {
    return await AppModel.getInstance().vault?.GetManyApi(cond)
  })
  ipcMain.handle(webToManMsg.GetAllValutItems, async (_, cond: WhereDef<VaultItem>) => {
    return await AppModel.getInstance().vaultItem?.GetManyApi(cond)
  })
  ipcMain.handle(webToManMsg.AddValut, async (_, valut) => {
    return await AppModel.getInstance().vault?.AddOneApi(valut)
  })
  ipcMain.handle(webToManMsg.AddValutItem, async (_, valutItem) => {
    return await AppModel.getInstance().vaultItem?.AddOneApi(valutItem)
  })
  ipcMain.handle(webToManMsg.DeleteValut, async (_, vault_id) => {
    return await AppModel.getInstance().vault?.DeleteOne(vault_id)
  })
  ipcMain.handle(webToManMsg.DeleteValutItem, async (_, vault_item_id) => {
    return await AppModel.getInstance().vaultItem?.DeleteOne(vault_item_id)
  })
  ipcMain.handle(webToManMsg.UpdateValut, async (_, new_valut) => {
    return await AppModel.getInstance().vault?.UpdateOne(new_valut)
  })
  ipcMain.handle(webToManMsg.updateValutItem, async (_, valutItem) => {
    return await AppModel.getInstance().vaultItem?.UpdateOne(valutItem)
  })
}
