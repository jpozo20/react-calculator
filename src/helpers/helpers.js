const Helpers = {
	decodeHtml: (htmlEntity) => {
		var txt = document.createElement("textarea");
		txt.innerHTML = htmlEntity;
		return txt.value;
	},
};

export default Helpers;
