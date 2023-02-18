import { login, sendCode } from './login'
import { getUserName, getMyname, changeprofile, updateAvatar } from './my'
import { getchannelList, getNewList, getAllChannels, setUserChannel } from './home'
import { LinkThink, toSearch } from './search'
import { getArticals, followings, unfollowings, colletions, uncolletions, likeings, dislikeings, getcommets, popcomment, likecommet, dislikecommet } from './article'
export const loginAPI = login
export const sendCodeAPI = sendCode
export const getUserNameAPI = getUserName
export const getMynameAPI = getMyname
export const updateAvatarAPI = updateAvatar
export const changeprofileAPI = changeprofile
export const getchannelListAPI = getchannelList
export const getNewListAPI = getNewList
export const getAllChannelsAPI = getAllChannels
export const setUserChannelAPI = setUserChannel
export const LinkThinkAPI = LinkThink
export const toSearchAPI = toSearch
export const getArticalsAPI = getArticals
export const followingsAPI = followings
export const unfollowingsAPI = unfollowings
export const colletionsAPI = colletions
export const uncolletionsAPI = uncolletions
export const likeingsAPI = likeings
export const dislikeingsAPI = dislikeings
export const getcommetsAPI = getcommets
export const popcommentAPI = popcomment
export const likecommetAPI = likecommet
export const dislikecommetAPI = dislikecommet