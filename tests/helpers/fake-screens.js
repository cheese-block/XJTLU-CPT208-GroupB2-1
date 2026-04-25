export function createImmediateScreen() {
  return {
    startEvent(event, done) {
      done?.();
    },
  };
}
