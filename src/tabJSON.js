// 将json字符串格式化
const tabJSON = (jsonString) => {
	try{
		const jsonObj = JSON.parse(jsonString)
		return JSON.stringify(jsonObj, null, 2)
	} catch (e) {
		return jsonString || '-'
	}
}

module.exports = tabJSON;