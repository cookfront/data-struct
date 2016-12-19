/**
 * 平衡符号
 *
 * 算法描述：初始化一个空栈，读入字符直到文件尾。如果字符是
 * 一个开放字符，则将其推入栈中。如果字符是一个封闭符号，则
 * 当栈空时报错。否则，将栈元素弹出。如果弹出的符号不是对应的
 * 开放符号，则报错。在文件尾，如果栈非空，则报错。
 */

function isBalanceSign(str) {
	var stack = [];
	var openSign = ['(', '[', '{'];
	var closeSign = [')', ']', '}'];
	var strItem;
	for (var i = 0, len = str.length; i < len; i++) {
		strItem = str[i];
		if (openSign.indexOf(strItem) !== -1) {
			stack.push(strItem);
		} else if (closeSign.indexOf(strItem) !== -1) {
			if (stack.length === 0) {
				return false;
			}
			var topStackItem = stack.pop();
			switch (strItem) {
				case ')':
					if (topStackItem !== '(') {
						return false;
					}
					break;
				case ']':
					if (topStackItem !== '[') {
						return false;
					}
					break;
				case '}':
					if (topStackItem !== '{') {
						return false;
					}
					break;
			}
		}
	}

	if (stack.length !== 0) {
		return false;
	}
	return true;
}

var str = '(09[]{[]{}})';
console.log(isBalanceSign(str));

