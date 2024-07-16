interface SubmitFormButtonProps {
  name: string;
}

const SubmitFormButton = ({ name }: SubmitFormButtonProps) => {
  return (
    <button
      type="submit"
      className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryHover"
    >
      {name}
    </button>
  );
};

export default SubmitFormButton;