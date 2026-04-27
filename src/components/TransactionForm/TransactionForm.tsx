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
      date: new Date().toLocaleDateString(),
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
        <fieldset className={css.fieldset}>
          <legend>Income</legend>
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
        </fieldset>
        <fieldset className={css.fieldset}>
          <legend>Expenses</legend>
          <Field
            type="text"
            name="living"
            placeholder="Living"
            className={css.input}
          />
          <Field
            type="text"
            name="meal"
            placeholder="Meal"
            className={css.input}
          />
          <Field
            type="text"
            name="habits"
            placeholder="Habits"
            className={css.input}
          />
          <Field
            type="text"
            name="road"
            placeholder="Road"
            className={css.input}
          />
          <Field
            type="text"
            name="entertainment"
            placeholder="Entertainment"
            className={css.input}
          />
        </fieldset>
        <button type="submit">ADD</button>
      </Form>
    </Formik>
  );
};
