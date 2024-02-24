# Frontend Development Best Practices in Next.js 14 with TypeScript and React Hooks

Next.js 14, combined with TypeScript and React hooks, provides a powerful stack for building scalable and maintainable web applications. This guide will delve into best practices for working with React hooks, TypeScript, and styling in the context of a Next.js application following the specified file structure.

## React Hooks Best Practices

### Using State and Effect Hooks

- `useState` should only manage state that is local to a component.
- `useEffect` must handle side effects; always include a dependency array to avoid unnecessary executions.

```tsx
const [state, setState] = useState(initialState);

useEffect(() => {
  // Side-effect logic
}, [dependencies]);
```

### Memoization Hooks

- `useCallback` prevents the creation of unnecessary functions on each render.
- `useMemo` is for memoizing complex calculations.

```tsx
const memoizedCallback = useCallback(() => {
  // Callback logic
}, [dependencies]);

const memoizedValue = useMemo(() => {
  // Computation
}, [inputs]);
```

### Custom Hooks Organization

- Store custom hooks in `hooks/[hookName]/index.tsx`.
- Ensure hooks are reusable and handle their own state and logic.

```tsx
// hooks/useCustomHook/index.tsx
export const useCustomHook = () => {
  // Hook logic
};
```

### Handling ESLint Warnings

- Do not suppress ESLint warnings without addressing the underlying issue.
- If a rule does not fit the team's workflow, discuss it and modify the rule set accordingly in the project's ESLint configuration.

## TypeScript Best Practices

### Type Declaration

- Avoid using `any` type. Always declare specific types for better type checking and readability.
- Use `interface` for object type definitions and `type` for unions and intersections.

```tsx
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

type UserResponse = User | Error;
```

### Utility Types and Generics

- Leverage utility types like `Partial`, `Readonly`, and `Record` for more complex type definitions.
- Use generics to create reusable and adaptable components or functions.

```tsx
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

### Avoiding Redundancy

- Do not explicitly declare types when TypeScript can infer them.
- Use TypeScript's path aliases to simplify imports and improve maintainability.

## Styling with Tailwind CSS and SASS

### Combining Classnames

- Use the `classnames` library (`cx`) for conditional and dynamic class names.
- Mix Tailwind utility classes with SASS for custom styles.

```tsx
import cx from 'classnames';
import styles from './online-users.module.scss';

const OnlineUserCard: FC<TOnlineUserCardProps> = ({ user }) => {
  return (
    <div className={cx(styles['online-user-card'], 'tw-class')}>
      {/* Content */}
    </div>
  );
};
```

### SASS File Structure

- Define module-specific styles in `.module.scss` files located alongside the component.
- Use BEM (Block Element Modifier) naming convention to maintain readability and consistency.

```scss
// online-users.module.scss
.online-user-card {
  @apply tw-utility-classes; // Tailwind classes
  // Additional custom styling
}
```

## File Structure and Component Organization

### Application Routing and Page Templates

- Use the `pages/` directory for page components with routing logic in `page.tsx`.
- Store page templates in `components/templates/[pageName]/index.tsx`.

### Page-Specific and Common Components

- Page-related components reside in `components/[pageName]/[pageRelatedComponent]/index.tsx`.
- Common components such as headers and footers are in `components/common/[component]/index.tsx`.

### GraphQL Queries and Utility Functions

- Maintain GraphQL queries in the `queries/` directory for better organization.
- Group utility functions by category in `utils/functions/[category]/index.tsx`.

---
