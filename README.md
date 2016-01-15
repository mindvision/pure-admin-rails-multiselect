# Pure Admin Multiselect Input

## Installation

Add this line to Gemfile

```
 gem 'pure-admin-rails-multiselect'
```

Add these lines to application.scss.css

```
 *= require pure_admin/inputs/multiselect
```

Add these lines to application.scss.css

```
 //= require pure_admin/inputs/multiselect
```

## Usage
Simple use the `:multiselect` type when writing a field in SimpleForm.

```erb
<%= f.input :positions, as: :multiselect %>
```