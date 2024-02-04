export const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? "0" + hours : hours}: ${
    hours < 10 ? "0" + minutes : minutes
  }`;
};

export const downloadMedia = (e, originalname, setLoading) => {
  e.preventDefault();
  setLoading(true);
  try {
    fetch(originalname)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;

        const nameSplit = originalname.split("/");
        const duplicateName = nameSplit.pop();

        a.download = "" + duplicateName + "";

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setLoading(false);
      })
      .catch((error) => {
        console.log(("Error while downloading image", error.message));
      });
  } catch (error) {
    console.log(("Error while downloading image", error.message));
    setLoading(false);
  }
};
