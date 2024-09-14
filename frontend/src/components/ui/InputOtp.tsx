interface InputOtpProps {
  inputLength: number;
  refs: any;
  onComplete: any;
}

const isLetterOrDigit = /^[a-zA-Z0-9]$/;

const InputOtp = ({ inputLength, refs, onComplete }: InputOtpProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key === "v") {
      return;
    }
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const index = refs.current.indexOf(target);
    if (event.key === "Backspace") {
      if (refs.current[index]?.value === "" && index > 0) {
        refs.current[index - 1]?.focus();
      } else {
        refs.current[index]!.value = "";
      }
    } else if (isLetterOrDigit.test(event.key)) {
      refs.current[index]!.value = event.key;
      if (index < refs.current.length - 1) {
        refs.current[index + 1]?.focus();
      }
    } else if (event.key === "ArrowLeft") {
      if (index > 0) {
        refs.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowRight") {
      if (index < refs.current.length - 1) {
        refs.current[index + 1]?.focus();
      }
    }
    if (index == 5) {
      onComplete();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("text");
    const filteredData = clipboardData.split("").filter((char: string) => isLetterOrDigit.test(char));
    for (let i = 0; i < refs.current.length; i++) {
      if (i < filteredData.length) {
        refs.current[i]!.value = filteredData[i];
      } else {
        refs.current[i]!.value = "";
      }
    }
  };

  return (
    <div className="mb-10 grid grid-cols-3 sm:grid-cols-6 gap-4">
      {Array.from({ length: inputLength }).map((_, index) => (
        <input
          className="h-16 items-center justify-center text-center px-5 outline-none rounded-xl border border-textContent text-lg bg-bkg focus:ring-1 ring-blue-700"
          type="text" maxLength={1} ref={(el) => (refs.current[index] = el)} key={index} autoFocus={index === 0}
          onPaste={handlePaste} onKeyDown={handleKeyDown} />
      ))
      }
    </div>
  );
};

export default InputOtp;