# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

require 'sprockets/es6'

activate :directory_indexes
activate :relative_assets
activate :livereload

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :sprockets do |sprockets|
  sprockets.supported_output_extensions << '.es6'
end

activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.branch = :master
end

after_configuration do
  sprockets.append_path 'node_modules'
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  activate :minify_css
  activate :minify_javascript
end
