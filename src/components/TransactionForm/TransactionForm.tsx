import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import {
  addTransaction,
  editTransaction,
  fetchTransactionById,
} from "../../api/transactionsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import type React from "react";
import type { Transaction } from "../../types/types";

import css from "./TransactionForm.module.css";
import { capitalize } from "../../utils/utils";

interface Props {
  id?: Transaction["id"];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TransactionForm = ({ id, setIsModalOpen }: Props) => {
  const queryClient = useQueryClient();

  const { data: transaction } = useQuery({
    queryKey: ["transaction"],
    queryFn: () => fetchTransactionById(id!),
    enabled: !!id,
  });

  const addMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTransactions"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: Transaction["id"]; data: Transaction }) =>
      editTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTransactions"] });
    },
  });

  const validationSchema = yup.object({
    income: yup
      .string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Required"),

    note: yup
      .string()
      .trim()
      .min(2, "Minimum 2 characters")
      .max(100, "Maximum 100 characters")
      .required("Required"),

    living: yup
      .string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Required"),

    food: yup
      .string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Required"),

    habits: yup
      .string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Required"),

    road: yup
      .string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Required"),

    entertainment: yup
      .string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .required("Required"),
  });

  interface FormValues {
    income: string;
    note: string;
    road: string;
    food: string;
    habits: string;
    living: string;
    entertainment: string;
  }

  const initialValues: FormValues = {
    income: transaction?.income?.toString() || "",
    note: transaction?.note || "",
    road: transaction?.expenses?.road?.toString() || "",
    food: transaction?.expenses?.food?.toString() || "",
    habits: transaction?.expenses?.habits?.toString() || "",
    living: transaction?.expenses?.living?.toString() || "",
    entertainment: transaction?.expenses?.entertainment?.toString() || "",
  };

  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    const totalExpenses =
      Number(values.living) +
      Number(values.food) +
      Number(values.habits) +
      Number(values.road) +
      Number(values.entertainment);

    const transaction: Transaction = {
      income: Number(values.income),
      note: capitalize(values.note),
      totalExpenses,
      expenses: {
        living: Number(values.living),
        food: Number(values.food),
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
    setIsModalOpen(prev => !prev);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <strong>Income</strong>
        <label>
          Note:
          <Field
            type="text"
            name="note"
            className={css.wide_input}
          />
          <ErrorMessage
            name="note"
            component="div"
            className={css.error_message}
          />
        </label>
        <label>
          Income:
          <Field
            type="text"
            name="income"
            className={css.wide_input}
          />
          <ErrorMessage
            name="income"
            component="div"
            className={css.error_message}
          />
        </label>
        <strong>Expenses</strong>
        <div className={css.expenses}>
          <label>
            Living:
            <Field
              type="text"
              name="living"
            />
            <ErrorMessage
              name="living"
              component="div"
              className={css.error_message}
            />
          </label>
          <label>
            Food:
            <Field
              type="text"
              name="food"
            />
            <ErrorMessage
              name="food"
              component="div"
              className={css.error_message}
            />
          </label>
          <label>
            Habits:
            <Field
              type="text"
              name="habits"
            />
            <ErrorMessage
              name="habits"
              component="div"
              className={css.error_message}
            />
          </label>
          <label>
            Road:
            <Field
              type="text"
              name="road"
            />
            <ErrorMessage
              name="road"
              component="div"
              className={css.error_message}
            />
          </label>
          <label className={css.entertainment}>
            Entertainment:
            <Field
              type="text"
              name="entertainment"
            />
            <ErrorMessage
              name="entertainment"
              component="div"
              className={css.error_message}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </Form>
    </Formik>
  );
};
