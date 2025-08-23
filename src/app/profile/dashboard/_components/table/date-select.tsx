import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormattedTransaction, MonthYearTransaction } from "../../definitions";

export default function DateSelect({
  dateFormatted,
  setSelectedMonth,
}: {
  dateFormatted: MonthYearTransaction[];
  setSelectedMonth: (transactions: FormattedTransaction[]) => void;
}) {
  return (
    <Select
      defaultValue={`${dateFormatted[0].month}-${dateFormatted[0].year}`}
      onValueChange={(value) => {
        const [month, year] = value.split("-");
        setSelectedMonth(
          dateFormatted.find(
            (date) =>
              date.month === parseInt(month) && date.year === parseInt(year),
          )?.transactions || [],
        );
      }}
      required
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {dateFormatted.map((item) => (
          <SelectItem
            key={`${item.month}-${item.year}`}
            value={`${item.month}-${item.year}`}
          >
            {item.month} - {item.year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
