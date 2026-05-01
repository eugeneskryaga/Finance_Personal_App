import { Field, Form, Formik, type FormikHelpers } from "formik";
import type { Transaction } from "../../types/types";
import { addTransaction, editTransaction } from "../../api/transactionsApi";

import css from "./TransactionForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  id?: Transaction["id"];
}

export const TransactionForm = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: Transaction["id"]; data: Transaction }) =>
      editTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  interface FormValues {
    income: string;
    note: string;
    road: string;
    meal: string;
    habits: string;
    living: string;
    entertainment: string;
  }

  const initialValues: FormValues = {
    income: "",
    note: "",
    road: "",
    meal: "",
    habits: "",
    living: "",
    entertainment: "",
  };

  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    const total =
      Number(values.living) +
      Number(values.meal) +
      Number(values.habits) +
      Number(values.road) +
      Number(values.entertainment);

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      income: Number(values.income),
      note: values.note,
      expenses: {
        total,
        living: Number(values.living),
        meal: Number(values.meal),
        habits: Number(values.habits),
        road: Number(values.road),
        entertainment: Number(values.entertainment),
      },
      date: new Date().toISOString().split("T")[0],
    };
    if (id) {
      editMutation.mutate({ id, data: transaction });
    } else {
      addMutation.mutate(transaction);
    }
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <strong>Income</strong>
        <Field
          type="text"
          name="income"
          placeholder="Income"
        />
        <Field
          type="text"
          name="note"
          placeholder="Note"
        />
        <strong>Expenses</strong>
        <div className={css.expenses}>
          <Field
            type="text"
            name="living"
            placeholder="Living"
          />
          <Field
            type="text"
            name="meal"
            placeholder="Meal"
          />
          <Field
            type="text"
            name="habits"
            placeholder="Habits"
          />
          <Field
            type="text"
            name="road"
            placeholder="Road"
          />
          <Field
            type="text"
            name="entertainment"
            placeholder="Entertainment"
          />
        </div>
        <button type="submit">Add</button>
      </Form>
    </Formik>
  );
};
