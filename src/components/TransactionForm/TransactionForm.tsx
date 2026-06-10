import type {
  SelectOption,
  Transaction,
  TransactionFormValues,
} from "../../types/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { postTransaction, patchTransaction } from "../../api/transactionsApi";
import {
  CATEGORIES,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/constants";
import {
  capitalize,
  formatDateForInput,
  convertDateToISO,
} from "../../utils/utils";
import Select, { type SingleValue } from "react-select";

import css from "./TransactionForm.module.css";

interface Props {
  transaction?: Transaction;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}

const validationSchema = Yup.object({
  type: Yup.string().required("Required"),
  category: Yup.string().when("type", {
    is: "income",
    then: schema => schema.oneOf(INCOME_CATEGORIES).required(),
    otherwise: schema => schema.oneOf(EXPENSE_CATEGORIES).required(),
  }),
  amount: Yup.number()
    .typeError("Value must be a number")
    .positive("Value must be positive")
    .required("Required"),
  note: Yup.string().max(100, "Note can have maximum 100 characters"),
});

export const TransactionForm = ({ transaction, setIsModalOpen }: Props) => {
  const queryClient = useQueryClient();

  const getTodayForInput = () => {
    const today = new Date();
    return formatDateForInput(today);
  };

  const initialValues: TransactionFormValues = {
    type: transaction?.type ?? "expense",
    category: transaction?.category ?? CATEGORIES.expenses[0],
    amount: transaction?.amount?.toString() ?? "",
    note: transaction?.note ?? "",
    date: transaction?.date
      ? formatDateForInput(transaction.date)
      : getTodayForInput(),
  };

  const mutation = useMutation({
    mutationFn: async (values: TransactionFormValues) => {
      const dateValue = values.date || getTodayForInput();
      const payload = {
        type: values.type,
        category: values.category,
        amount: Number(values.amount),
        note: capitalize(values.note.trim()) || undefined,
        date: convertDateToISO(dateValue),
      };

      if (transaction?._id) {
        return patchTransaction(transaction._id, payload);
      }

      return postTransaction({
        ...payload,
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setIsModalOpen(false);
    },
  });
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={values => mutation.mutate(values)}
    >
      {({ values, setFieldValue }) => {
        const categories =
          values.type === "income" ? CATEGORIES.income : CATEGORIES.expenses;

        const categoryOptions: SelectOption[] = categories.map(category => ({
          value: category,
          label: capitalize(category),
        }));

        const selectedCategory =
          categoryOptions.find(option => option.value === values.category) ??
          null;

        const minDate = formatDateForInput(new Date(2026, 4, 1));
        const maxDate = formatDateForInput(new Date());

        return (
          <Form className={css.form}>
            <div className={css.dateInput}>
              <Field
                type="date"
                name="date"
                min={minDate}
                max={maxDate}
              />
            </div>
            <div className={css.type}>
              <label
                className={values.type === "expense" ? css.activeExpense : ""}
              >
                <Field
                  type="radio"
                  name="type"
                  value="expense"
                  onClick={() => {
                    setFieldValue("category", CATEGORIES.expenses[0], false);
                    setFieldValue("type", "expense", false);
                  }}
                />
                Expense
              </label>
              <label
                className={values.type === "income" ? css.activeIncome : ""}
              >
                <Field
                  type="radio"
                  name="type"
                  value="income"
                  onClick={() => {
                    setFieldValue("category", CATEGORIES.income[0], false);
                    setFieldValue("type", "income", false);
                  }}
                />
                Income
              </label>
            </div>
            <div className={css.category}>
              <Select
                unstyled
                classNames={{
                  control: () => css.control,
                  menu: () => css.menu,
                  option: state =>
                    state.isFocused ? css.optionFocused : css.option,
                }}
                options={categoryOptions}
                value={selectedCategory}
                onChange={(option: SingleValue<SelectOption>) =>
                  setFieldValue("category", option?.value ?? "")
                }
                placeholder="Category"
                name="category"
              />
              <Field
                type="number"
                name="amount"
                placeholder="Amount"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.textArea}>
              <Field
                as="textarea"
                name="note"
                placeholder="Note..."
              />
              <ErrorMessage
                name="note"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.buttons}>
              <button
                type="button"
                className={css.close}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? "Saving..."
                  : transaction
                    ? "Update"
                    : "Add"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
