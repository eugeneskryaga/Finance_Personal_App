import type { Transaction } from "../../types/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";

import { postTransaction, patchTransaction } from "../../api/transactionsApi";
import {
  CATEGORIES,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../constants/constants";

import css from "./TransactionForm.module.css";
import { capitalize } from "../../utils/utils";

interface Props {
  transaction?: Transaction;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
  type: "income" | "expense";
  category: string;
  amount: number;
  note: string;
}

const validationSchema = Yup.object({
  type: Yup.string().required("Required"),
  category: Yup.string().when("type", {
    is: "income",
    then: schema => schema.oneOf(INCOME_CATEGORIES).required(),

    otherwise: schema => schema.oneOf(EXPENSE_CATEGORIES).required(),
  }),
  amount: Yup.number().positive("Value must be positive").required("Required"),
  note: Yup.string().max(100, "Note can have maximum 100 characters"),
});

export const TransactionForm = ({ transaction, setIsModalOpen }: Props) => {
  const queryClient = useQueryClient();

  const initialValues: FormValues = {
    type: transaction?.type ?? "expense",
    category: transaction?.category ?? CATEGORIES.expenses[0],
    amount: transaction?.amount ?? 0,
    note: transaction?.note ?? "",
  };

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        ...values,
        note: values.note.trim() || undefined,
      };

      if (transaction?._id) {
        return patchTransaction(transaction._id, payload);
      }

      return postTransaction({
        ...payload,
        date: new Date().toISOString(),
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

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

        return (
          <Form className={css.form}>
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
              <Field
                as="select"
                name="category"
              >
                {categories.map(category => (
                  <option
                    key={category}
                    value={category}
                  >
                    {capitalize(category)}
                  </option>
                ))}
              </Field>
              <Field
                type="text"
                name="amount"
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
                    : "Create"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
