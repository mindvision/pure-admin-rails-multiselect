##
# Defines the :multiselect input type.
# @example <% f.association :permissions, as: :multiselect } %>
class MultiselectInput < SimpleForm::Inputs::CollectionSelectInput
  include ActionView::Helpers::TagHelper

  def input
    markup = filter_markup
    markup << (header_markup(:selectable) + header_markup(:selection)) unless options[:header] == false
    markup << footer_markup unless options[:buttons] == false

    super + markup
  end

  def input_html_classes
    super.push('pure-admin-multiselect')
  end

  def input_html_options
    super.deep_merge(multiple: true)
  end

  protected

    # Creates and returns the markup needed for multiselect filters.
    # This is rendered to the page hidden to be picked up and manipulated by the JavaScript.
    # @return (String)
    def filter_markup
      content_tag(:input, nil, type: :text, class: 'pure-admin-multiselect-filter-input',
        autocomplete: :off, placeholder: 'Filter', style: 'display: none;')
    end

    # Creates and returns the markup needed for multiselect headers.
    # This is rendered to the page hidden to be picked up and manipulated by the JavaScript.
    # @param (Symbol) the type of header markup to use (:selectable/:selected)
    # @return (String)
    def header_markup(type)
      if type == :selectable
        content = "All Available #{attribute_name.to_s.sub('_id', '').titleize}"
        specific_class = 'selectable'
      elsif type == :selection
        content = 'Current Selections'
        specific_class = 'selection'
      end

      content_tag(:div, content, class: "pure-admin-multiselect-header #{specific_class}",
        style: 'display: none;')
    end

    # Creates and returns the markup needed for multiselect footers.
    # This is rendered to the page hidden to be picked up and manipulated by the JavaScript.
    # @return (String)
    def footer_markup
      add_all_icon = content_tag(:i, nil, class: 'fa fa-fw fa-plus-square')
      add_all = content_tag(:a, add_all_icon + 'Add All', href: '#',
        class: 'pure-button mini add-all pull-right')

      remove_all_icon = content_tag(:i, nil, class: 'fa fa-fw fa-minus-square')
      remove_all = content_tag(:a, remove_all_icon + 'Remove All', href: '#',
        class: 'pure-button mini remove-all')

      selectable = content_tag(:div, add_all, class: 'pure-admin-multiselect-footer selectable',
        style: 'display: none;')
      selection = content_tag(:div, remove_all, class: 'pure-admin-multiselect-footer selection',
        style: 'display: none;')

      selectable + selection
    end
end
