export default function SelectComponent({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="relative">
      <p className=" text-m font-semibold px-1">
        {label}
      </p>
      <div class="flex">
          <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
      <select
        value={value}
        onChange={onChange}
        className="w-full -ml-9 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
}
