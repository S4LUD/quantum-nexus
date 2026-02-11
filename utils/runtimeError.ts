type RuntimeErrorMetadata = Record<
  string,
  string | number | boolean | null | undefined
>;

interface RuntimeErrorContext {
  scope: string;
  action: string;
  metadata?: RuntimeErrorMetadata;
}

function normalizeRuntimeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }
  if (typeof error === "string") {
    return {
      name: "StringError",
      message: error,
    };
  }
  return {
    name: "UnknownError",
    message: "Unknown runtime failure",
  };
}

export function reportRuntimeError(context: RuntimeErrorContext, error: unknown) {
  const normalized = normalizeRuntimeError(error);
  console.warn("[runtime]", {
    scope: context.scope,
    action: context.action,
    ...normalized,
    ...(context.metadata || {}),
  });
}
