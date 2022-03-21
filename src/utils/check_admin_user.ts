import axios from 'axios';
import { RESTGetAPIOAuth2CurrentAuthorizationResult } from 'discord-api-types';
import { Session } from 'next-auth';

/**
 * 受け取ったDiscordユーザーIDが適当なものか確認する
 * @param  {string} id - ユーザーID
 * @param  {()=>string[]|undefined} getIDs? - IDリスト取得関数を外部から注入する
 */
const isAdminUser = (id: string, getIDs?: () => string[] | undefined) => {
  if (getIDs === undefined) getIDs = () => process.env.DISCORD_ADMIN_IDS?.split(`,`);
  const ids = getIDs();
  if (ids === undefined) return true;
  return ids.includes(id);
};

/**
 * セッション情報からDiscordAPIにアクセスし適当なユーザーであるかを確認する
 * @param  {Session|null} session - 確認したいセッション
 */
const isAdminUserOauth2 = async (session: Session | null) => {
  if (session === null) return false;

  const token = session.accessToken;
  if (token === undefined) return false;

  try {
    const r = await axios.get<RESTGetAPIOAuth2CurrentAuthorizationResult>(
      'https://discord.com/api/oauth2/@me',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const id = r.data.user?.id;

    if (id === undefined || !isAdminUser(id)) {
      console.log(id);
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};
export { isAdminUser, isAdminUserOauth2 };
