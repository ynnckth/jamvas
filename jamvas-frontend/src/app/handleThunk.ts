export const handleThunk = async <T>(
  thunkFunction: () => Promise<T>,
  rejectWithValue: (value: string) => any
): Promise<T> => {
  try {
    return await thunkFunction();
  } catch (err) {
    console.error("Error occurred in thunk: ", err);
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    throw err;
  }
};
