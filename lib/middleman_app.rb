module MiddlemanApp
  class Extension < Middleman::Extension
    # Expose a method to views:
    # expose_to_template :method_name
    
    # Expose a method to config:
    # expose_to_config :method_name

    def initialize(app, options_hash = {}, &block)
      super
    end
  end
end

::Middleman::Extensions.register :middleman_app, MiddlemanApp::Extension