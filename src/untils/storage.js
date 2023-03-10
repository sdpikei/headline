// 定义本地储存的增删改

export const setLocalKey = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    window.localStorage.setItem(key, val)
}
export const getLocalKey = (key) => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}
export const removeLocalKey = key => {
    window.localStorage.removeItem(key)
}

