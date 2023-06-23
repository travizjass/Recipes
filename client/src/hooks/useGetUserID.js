function useGetUserID() {
  return window.localStorage.getItem("userID");
}

export default useGetUserID
