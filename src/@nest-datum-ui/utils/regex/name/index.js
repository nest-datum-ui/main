import utilsCheckStr from '@nest-datum-ui/utils/check/str';

const name = (e, pattern = /[^a-zA-Zа-яА-Я 0-9'-]+/g) => {
	if (!utilsCheckStr(e.target.value)) {
		e.target.value = '';
	}
	else {
		if (e.target.value[0] === ' '
			|| e.target.value[0] === '-'
			|| e.target.value[0] === "'"
			|| e.target.value[0] === "\n"
			|| e.target.value[0] === "\t"
			|| !Number.isNaN(Number(e.target.value[0]))) {
			e.target.value = '';
		}
		else {
			const hyphenIndex = e.target.value.indexOf('-');
			const apostropheIndex = e.target.value.indexOf("'");
			const spaceIndex = e.target.value.indexOf(' ');
			const doubleHyphenIndex = e.target.value.indexOf('--');
			const doubleApostropheIndex = e.target.value.indexOf("''");
			const doubleSpaceIndex = e.target.value.indexOf('  ');

			if (doubleHyphenIndex >= 0) {
				e.target.value = e.target.value.slice(0, doubleHyphenIndex + 1);
			}
			else if (doubleApostropheIndex >= 0) {
				e.target.value = e.target.value.slice(0, doubleApostropheIndex + 1);
			}
			else if (doubleSpaceIndex >= 0) {
				e.target.value = e.target.value.slice(0, doubleSpaceIndex + 1);
			}
			else if (hyphenIndex >= 0
				&& (e.target.value[hyphenIndex + 1] === ' '
					|| e.target.value[hyphenIndex + 1] === '-'
					|| e.target.value[hyphenIndex + 1] === "'"
					|| e.target.value[hyphenIndex + 1] === "\n"
					|| e.target.value[hyphenIndex + 1] === "\t"
					|| !Number.isNaN(Number(e.target.value[hyphenIndex + 1])))) {
				e.target.value = e.target.value.slice(0, hyphenIndex + 1);
			}
			else if (apostropheIndex >= 0
				&& (e.target.value[apostropheIndex + 1] === ' '
					|| e.target.value[apostropheIndex + 1] === '-'
					|| e.target.value[apostropheIndex + 1] === "'"
					|| e.target.value[apostropheIndex + 1] === "\n"
					|| e.target.value[apostropheIndex + 1] === "\t"
					|| !Number.isNaN(Number(e.target.value[apostropheIndex + 1])))) {
				e.target.value = e.target.value.slice(0, apostropheIndex + 1);
			}
			else if (spaceIndex >= 0
				&& (e.target.value[spaceIndex + 1] === ' '
					|| e.target.value[spaceIndex + 1] === '-'
					|| e.target.value[spaceIndex + 1] === "'"
					|| e.target.value[spaceIndex + 1] === "\n"
					|| e.target.value[spaceIndex + 1] === "\t"
					|| !Number.isNaN(Number(e.target.value[spaceIndex + 1])))) {
				e.target.value = e.target.value.slice(0, spaceIndex + 1);
			}
			else {
				e.target.value = e.target.value.replace(pattern, '');
			}
		}
	}
};

export default name;
