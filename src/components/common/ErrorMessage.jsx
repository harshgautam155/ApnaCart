function ErrorMessage({ message }) {
  return (
    <p className="text-center text-red-500 py-10">
      {message || "Something went wrong."}
    </p>
  );
}

export default ErrorMessage;